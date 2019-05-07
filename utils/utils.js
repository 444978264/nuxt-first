import { encode, decode } from '../assets/lib/base64';

// base64
export const base64 = () => {
  return { encode, decode };
};

// 判断对象中是否用某个属性
export const has = (target, key) => {
  return Reflect.has(target, key);
};

// 删除对象的某个属性 代替 delete
export const deleteProperty = (target, key) => {
  return Reflect.deleteProperty(target, key);
};

// 对象格式化：{a:1,b:2} => ?a=1&b=2
export const urlSerialize = (...args) => {
  if (args.length === 1) {
    const [params] = args;
    return reducer(params);
  }
  const [url, params] = args;
  return reducer(params, url);
  function reducer(params, url = '') {
    const serializeRes = Object.entries(params);
    return serializeRes.reduce((result, [key, value], i) => {
      if (i === 0) {
        return (result += `?${key}=${value}`);
      }
      return (result += `&${key}=${value}`);
    }, url);
  }
};

// 获取 search 中的值
export const getUrlParams = key => {
  const uri = window.location.search;
  const query = uri.startsWith('?') ? uri.substr(1) : uri;
  const store = query.split('&');
  const result = store.reduce((res, item) => {
    const [key, value] = item.split('=');
    if (has(res, key)) {
      console.warn(`search 中 存在相同的key：${key}`);
    } else {
      res[key] = value;
    }
    return res;
  }, {});
  return key ? result[key] : result;
};

// 通过字符串获取对象中的值
export const evalVal = store => {
  const generateFn = function(store) {
    return function(params, val) {
      return new Function(
        'store',
        'val',
        `return val?(store.${params}=val):store.${params};`
      )(store, val);
    };
  };
  return generateFn(store);
};

/*
 * formats格式包括
 *  　　1. Y-M-D
 *  　　2. Y-M-D h:m:s
 *  　　3. Y年M月D日
 *  　　4. Y年M月D日 h时m分
 *  　　5. Y年M月D日 h时m分s秒
 *  　　示例：console.log(formatDate(1500305226034, 'Y年M月D日 h:m:s')) ==> 2017年07月17日 23:27:06
 */
export const formatDate = (timestamp, formats = 'Y-M-D') => {
  const myDate = timestamp ? new Date(timestamp) : new Date();
  const year = myDate.getFullYear();
  const month = formatDigit(myDate.getMonth() + 1);
  const day = formatDigit(myDate.getDate());
  const hour = formatDigit(myDate.getHours());
  const minute = formatDigit(myDate.getMinutes());
  const second = formatDigit(myDate.getSeconds());
  return formats.replace(/Y|M|D|h|m|s/g, function(matches) {
    return {
      Y: year,
      M: month,
      D: day,
      h: hour,
      m: minute,
      s: second
    }[matches];
  });
  // 小于10补0
  function formatDigit(n) {
    return n.toString().replace(/^(\d)$/, '0$1');
  }
};

// 数据类型 判断
export function typeIs(data) {
  return Object.prototype.toString
    .call(data)
    .substr(8)
    .replace(']', '');
}

// exp: Type.isString
export const Type = (types => {
  const typeFn = {};
  types.forEach(type => {
    typeFn[`is${type}`] = param => typeIs(param) === type;
  });
  return typeFn;
})(['String', 'Function', 'Object', 'Array', 'Number']);

// 保留位数 显示
export function toFixed(num = 0, fixed = 2) {
  if (!['String', 'Number'].includes(typeIs(num))) {
    throw Error('[toFixed] arguments must be number of string');
  }
  let res = String(num);
  const isFloat = res.includes('.');
  const parse = num => {
    const [int, float] = num.split('.');
    return `${int}.${float.substr(0, fixed)}`;
  };
  return isFloat ? parse(res) : (res += `.${'0'.repeat(fixed)}`);
}

// 千分位 显示
export function toThousands(num, fixed = 2) {
  return parseFloat(num)
    .toFixed(fixed)
    .replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, '$1,');
}

export default {
  base64,
  has,
  deleteProperty,
  urlSerialize,
  getUrlParams,
  evalVal,
  formatDate,
  typeIs,
  Type,
  toFixed,
  toThousands
};
