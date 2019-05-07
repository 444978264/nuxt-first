/*
 * @Description: 通用功能
 * @LastEditors: Lorin
 * @Date: 2019-04-03 11:49:56
 * @LastEditTime: 2019-04-06 22:04:23
 */
import Util from '../plugins/util/util';
import md5 from '../assets/lib/md5';

const Common = {
  /**
   * @description: 获取OpenIDHash
   * @return:
   * @param str
   */
  getOpenIDHash: function(str) {
    let result = '';
    if (str) {
      result = md5.hex_md5('Hjm?' + md5.hex_md5(str + 'Aha^_^'));
    }
    return result;
  },
  /**
   * @description: 验证手机号
   * @return:
   * @param countryCode
   * @param mobile
   */
  checkMobile: function(countryCode, mobile) {
    let result = false;
    if (countryCode === '+86') {
      if (Util.REG.MOBILE.test(mobile)) {
        result = true;
      }
    } else if (/^\d{1,11}$/g.test(mobile)) {
      result = true;
    }
    return result;
  },
  /**
   * 获取aha channel
   */
  getAhaChannel: function() {
    const result = 'web';
    return result;
  },
  /**
   * 获取 aha session_id
   */
  getAhaSessionId: function() {
    return Util.generateID();
  },
  /**
   * 获取 aha session_name
   */
  getAhaSessionName: function() {
    return window.navigator.userAgent.toLocaleLowerCase();
  },
  /**
   * 获取客户端类型
   */
  getAhaClientType: function() {
    const result = 2;
    return result;
  }
};
export default Common;
