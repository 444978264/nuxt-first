/*
 * @Description: 工具类
 * @LastEditors: Lorin
 * @Date: 2019-03-29 16:53:09
 * @LastEditTime: 2019-04-05 19:53:46
 */
import { encode, decode } from '../../assets/lib/base64';
const Util = {
  /**
   * @description: 正则
   * @param {type}
   * @return:
   */
  REG: {
    // 数字类型日期  20170707
    NumDate: /^(19|20)\d{2}(1[0-2]|0?[1-9])(0?[1-9]|[1-2][0-9]|3[0-1])$/,
    // 手机号
    MOBILE: /^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/
  },
  /**
   * @description: base64
   * @param {type}
   * @return:
   */
  base64: function() {
    return { encode, decode };
  },
  /**
   * @description: 生成GUID
   * @param {type}
   * @return:
   */
  generateID: function() {
    let guid = '';
    for (let i = 1; i <= 32; i++) {
      const n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
      if (i === 8 || i === 12 || i === 16 || i === 20) guid += '-';
    }
    return guid;
  },
  /**
   * 字符串转时间（yyyy-MM-dd HH:mm:ss）
   * result （分钟）
   */
  stringToDate: function(fDate) {
    return new Date(fDate.replace(/-/g, '/'));
  },
  /**
   * 获取两个日期相差的天数
   * startDate 开始时间
   * endDate 结束时间
   */
  getDaysDiff: function(startDate, endDate) {
    return parseFloat(Math.abs(endDate - startDate) / 1000 / 60 / 60 / 24); // 把相差的毫秒数转换为天数
  }
};
export default Util;
