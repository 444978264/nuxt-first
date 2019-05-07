export const log = type => {
  return (target, name, descriptor) => {
    const method = descriptor.value;
    descriptor.value = (...args) => {
      console.info(`(${type}) 正在执行: ${name}(${args}) = ?`);
      let ret;
      try {
        ret = method.apply(target, args);
        console.info(`(${type}) 成功 : ${name}(${args}) => ${ret}`);
      } catch (error) {
        console.error(`(${type}) 失败: ${name}(${args}) => ${error}`);
      }
      return ret;
    };
  };
};

export const mixins = (...list) => {
  return function(target) {
    Object.assign(target.prototype, ...list);
  };
};

export const symbolMatch = (mark = ':') => {
  const markReg = new RegExp(`\\${mark}(\\w+)`, 'g');
  return (target, name, descriptor) => {
    const oldFn = descriptor.value;
    descriptor.value = function(...args) {
      let [matchStr, params, other] = args;
      // 浅拷贝一份数据
      const copyParams = { ...params };
      matchStr = matchStr.includes(mark)
        ? matchStr.replace(markReg, function(matched, $1) {
            if (!Reflect.has(copyParams, $1)) {
              throw Error(`缺少参数${$1}`);
            }
            const result = params[$1];
            Reflect.deleteProperty(copyParams, $1);
            return result;
          })
        : matchStr;
      return oldFn.call(this, matchStr, copyParams, other);
    };
    return descriptor;
  };
};
