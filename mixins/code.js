/*
 * @Description: api交互code
 * @LastEditors: Lorin
 * @Date: 2019-04-04 21:46:31
 * @LastEditTime: 2019-04-08 13:14:56
 */
const codeMap = {
  'MAXDEVICE-OLD': 5100, // 5100 超过设备数
  MAXDEVICE: 205100, // 205100 超过设备数
  'LOGINEXPIRE-OLD': 5000, // 5000 登录过期
  LOGINEXPIRE: 205000, // 205000 登录过期
  'AUTHERROR-OLD': 1000, // 1000 授权错误
  AUTHERROR: 701000, // 701000 授权错误
  'CONFIGERROR-OLD': 1001, // 1001 配置错误
  CONFIGERROR: 701001, // 701001 配置错误
  'VERIFYERROR-OLD': 1002, // 1002 验证码错误
  VERIFYERROR: 701002, // 701002 验证码错误
  'MOBILEOCCUPY-OLD': 1003, // 1003 手机号已注册
  MOBILEOCCUPY: 701003, // 701003 手机号已注册
  'USERRECEIVE-OLD': 4701, // 4701 用户已领过
  USERRECEIVE: 174701, // 174701 用户已领过
  'USERHASRIGHT-OLD': 4702, // 4702 用户有权限
  USERHASRIGHT: 174702, // 174702 用户有权限
  'SOLDOUT-OLD': 4703, // 4703 已抢完
  SOLDOUT: 174703, // 174703 已抢完
  'ONLYNEWUSER-OLD': 4704, // 4704 仅限新用户
  ONLYNEWUSER: 174704, // 174704 仅限新用户
  'ONLYOLDUSER-OLD': 4705, // 4705 仅限老用户
  ONLYOLDUSER: 174705, // 174705 仅限老用户
  'RECEIVEVIDEO-OLD': 4706, // 4706 已领取过该系列视频
  RECEIVEVIDEO: 174706, // 174706 已领取过该系列视频
  'GROUPBUYEND-OLD': 9001, // 9001 限时段 拼课结束 || 没团
  GROUPBUYEND: 109001, // 109001 限时段 拼课结束 || 没团
  PRODUCTERROR1: 1301, // 1301 错误的商品信息
  PRODUCTERROR2: 1302, // 1302 错误的商品信息
  'ORDERERROR-OLD': 4247, // 4247 订单错误
  ORDERERROR: 104247, // 104247 订单错误
  'LUCKYBUGEXPIRE-OLD': 4201, // 4201 福袋过期
  LUCKYBUGEXPIRE: 154201, // 154201 福袋过期
  'LUCKYBUGMAX-OLD': 4202, // 4202 福袋领取超过3次
  LUCKYBUGMAX: 154202, // 154202 福袋领取超过3次
  'LUCKYBUGSOLDOUT-OLD': 4203, // 4203 福袋已经被抢完
  LUCKYBUGSOLDOUT: 154203, // 154203 福袋已经被抢完
  default: 404
};
const Code = {
  getCode(key) {
    return codeMap[key] || codeMap.default;
  }
};
export default Code;
