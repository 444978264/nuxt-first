import Apis from './api.inject';
import noProxy from './self';
export default function(ctx) {
  const { $axios } = ctx;
  $axios.onRequest(config => {
    noProxy(config);
    return config;
  });
  $axios.onResponse(response => {
    if (response.data.code !== 0) {
      return Promise.reject(response.data);
    }
    return Promise.resolve(response.data);
  });
  $axios.onError(error => {
    // console.log(error, 'onError');
    return Promise.reject(error);
  });

  ctx.$http = Apis($axios);
}
