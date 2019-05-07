const cookieparser = process.server ? require('cookieparser') : undefined;

// authToken 类型
const AUTH_VISITOR = 'visitor';
const AUTH_USER = 'token';

export const state = () => ({
  token: null,
  visitor: 'test_visitor_token',
  userInfo: null
});

export const mutations = {
  SET_AUTH(state, { token, type = AUTH_VISITOR }) {
    if (type === AUTH_USER) {
      state.token = token;
    }
    this.$axios.setToken(token || state.visitor, 'Basic');
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  logout(state) {
    this.$cookie.remove('token');
    this.$cookie.remove('userInfo');
    this.commit('SET_AUTH', { token: null, type: AUTH_USER });
    this.commit('SET_USER_INFO', null);
    this.$router.push('/');
  }
};
export const getters = {
  userInfo: state => {
    let userInfo = {};
    if (state.token) {
      userInfo = state.userInfo || {};
    }
    return userInfo;
  },
  isLogin: state => Boolean(state.token)
};
export const actions = {
  nuxtServerInit({ commit, state }, { req }) {
    let token = state.visitor;
    let type = AUTH_VISITOR;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      token = parsed.token;
      let userInfo = null;
      if (parsed.userInfo) {
        userInfo = JSON.parse(parsed.userInfo);
      }
      type = AUTH_USER;
      commit('SET_USER_INFO', userInfo);
    }
    commit('SET_AUTH', { token, type });
  },
  /**
   * @description: 登录
   * @param:
   * mobile 手机号
   * code 验证码
   * @return:
   */
  login({ commit }, data) {
    return this.$http.login(data).then(res => {
      let expiredDays = 3650;
      let token = 'test_token';
      this.$cookie.set('token', token, { expires: expiredDays });
      commit('SET_AUTH', { token, type: AUTH_USER });
      return token;
    });
  }
};
