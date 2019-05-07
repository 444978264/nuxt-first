import { Message } from 'element-ui';
import ApiGenerator from './api.inject';

export default function(ctx, inject) {
  const { store, $axios } = ctx;
  // 跟踪参数暂不处理
  $axios.setHeader('X-Env', '');
  $axios.setHeader('X-Requested-With', 'XMLHttpRequest');
  $axios.setHeader('X-Request-Page', location.href);
  // 游客
  let basic_auth = store.state.visitor;
  // 已登录之后
  if (store.state.token) {
    basic_auth = store.state.token;
  }
  $axios.setToken(basic_auth, 'Basic');
  $axios.onRequest(config => {
    return config;
  });
  $axios.onResponse(response => {
    if (response.data.code !== 0) {
      Message({
        type: 'error',
        message: response.data.message || '系统异常'
      });
      return Promise.reject(response.data);
    }
    return Promise.resolve(response.data);
  });
  $axios.onError(error => {
    console.log(error, 'onError');
    return Promise.reject(error);
  });

  ctx.$http = ApiGenerator($axios, inject);
}
