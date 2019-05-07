/*
 * @Author: lorinzhang
 * @Date: 2019-04-04 22:00:42
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-07 14:43:30
 */
export default {
  /**
   * 登录
   * mobile:手机号
   * code:验证码
   * @returns
   */
  login() {
    return this.post('/api/login', ...arguments);
  },

  /**
   * 获取验证码
   * mobile: 手机号,
   * type: 4, //陌生人登录为4
   * channel: codeType //1 短信验证码 2 语音验证码
   * @returns
   */
  sendSMS() {
    return this.post('/proxy/XXXXXXXXXXX', ...arguments);
  },
  /**
   * example
   * :id
   * @returns
   */
  exampleApi() {
    return this.get('/proxy/v1/products/:id/applyusers', ...arguments);
  }
};
