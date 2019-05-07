/*
 * @Description: 用户状态
 * @LastEditors: Lorin
 * @Date: 2019-03-26 17:19:36
 * @LastEditTime: 2019-04-16 17:41:55
 */
import Common from '../mixins/common';
import Cons from '../mixins/cons';
import Util from '../plugins/util/util';
const cookieparser = process.server ? require('cookieparser') : undefined;

// authToken 类型
const AUTH_VISITOR = 'visitor';
const AUTH_USER = 'token';

export const state = () => ({
  token: null,
  visitor: Util.base64().encode(Cons.VISITORAUTH),
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
  login({ commit }, { country_code = '', mobile, code }) {
    const data = {
      country_code: country_code.replace(/\+/g, ''),
      mobile: mobile,
      code: code
    };
    // openid
    data.openid = '';
    // 渠道
    data.channel = Common.getAhaChannel();
    // hash
    data.hash = Common.getOpenIDHash(data.openid);
    // 设备会话session_id
    data.session_id = Common.getAhaSessionId();
    // 设备会话session_name
    data.session_name = Common.getAhaSessionName();
    // 客户端类型
    data.client_type = Common.getAhaClientType();
    return this.$http.login(data).then(res => {
      const { visitor_id, auth_token, expired_at, user_id } = res.data;
      // 游客token
      let token = Cons.VISITORAUTH;
      // 已登录之后 visitor_id ,auth_token
      if (visitor_id && auth_token) {
        token = visitor_id + ':' + auth_token;
      }
      token = Util.base64().encode(token);
      let expiredDays = 3650;
      if (expired_at) {
        // 计算服务端返回的过期时间距离今天的天数
        const _eDate = Util.stringToDate(expired_at);
        // 获取相差的天数
        expiredDays = Util.getDaysDiff(new Date(), _eDate);
      }
      // js-cookie 只支持 expires 值未天数
      this.$cookie.set('token', token, { expires: expiredDays });

      commit('SET_AUTH', { token, type: AUTH_USER });
      // 保存用户信息
      this.$http.getUserInfo({ user_id: user_id }).then(res => {
        let userInfo = res.data;
        this.$cookie.set('userInfo', JSON.stringify(userInfo), {
          expires: expiredDays
        });
        commit('SET_USER_INFO', userInfo);
      });
      return token;
    });
  }
};
