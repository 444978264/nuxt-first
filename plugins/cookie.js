import Vue from 'vue';
import cookie from 'js-cookie';

export default function(ctx, inject) {
  Vue.prototype.$cookie = cookie;
  inject('cookie', cookie);
}
