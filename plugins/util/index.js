import Vue from 'vue';
import Util from './util';

export default function(ctx, inject) {
  Vue.prototype.$Util = Util;
}
