export default {
  /**
   * 登录
   * @returns
   */
  login() {
    return this.post('/api/login', ...arguments);
  },

  /**
   * 获取验证码
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
