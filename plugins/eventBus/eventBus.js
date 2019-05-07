import Vue from 'vue';
const EventBus = new Vue({});

export default {
  install(vue) {
    vue.prototype.$bus = EventBus;
    vue.mixin({
      beforeDestroy() {
        this.$bus.$off();
      }
    });
  }
};
