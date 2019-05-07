import Vue from 'vue';
import Util from '../../utils/utils';

export default function(ctx, inject) {
  Vue.prototype.$util = Util;
}
