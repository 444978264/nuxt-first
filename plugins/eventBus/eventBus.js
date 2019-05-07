import { Type } from '../../utils/utils';
import { EventEmitter } from './eventEmitter';

class EventBus {
  constructor(vue = Object) {
    this.instance = vue;
    this.busCollection = new Map();
    this.scopeChannel = new Map();
  }

  isVue(scope) {
    return scope instanceof this.instance;
  }

  getNameSpace(scope) {
    const isVue = this.isVue(scope);
    return isVue ? scope._uid : scope;
  }
  // 订阅
  on({ channel, resolve: fn, scope }) {
    if (!Type.isFunction(fn)) return;

    if (this.busCollection.has(channel)) {
      const emitter = this.busCollection.get(channel);
      emitter.value && fn(emitter.value);
      emitter.on(fn);
    } else {
      const event = new EventEmitter(channel).on(fn);
      this.busCollection.set(channel, event);
    }

    const namespace = this.getNameSpace(scope);
    if (this.scopeChannel.has(namespace)) {
      this.scopeChannel.get(namespace)[channel].push(fn);
    } else if (namespace) {
      this.scopeChannel.set(namespace, {
        [channel]: [fn]
      });
    }

    return this;
  }
  // 发布
  emit({ channel, value }) {
    if (this.busCollection.has(channel)) {
      this.busCollection
        .get(channel)
        .emit(value)
        .val(value);
    }
    return this;
  }
  // 注销
  off({ channel, resolve: fn, scope }) {
    const namespace = this.getNameSpace(scope);
    if (namespace && this.scopeChannel.has(namespace)) {
      Object.entries(this.scopeChannel.get(namespace)).forEach(
        ([key, values]) => {
          const emitter = this.busCollection.get(key);
          while (values.length) {
            emitter.off(values.pop());
          }
          // 注销 事件
          if (!emitter.size()) this.busCollection.delete(key);
        }
      );
      this.scopeChannel.delete(namespace);
    } else if (channel) {
      this.busCollection.get(channel).off(fn);
    }
    return this;
  }
}

export default {
  install(vue) {
    vue.prototype.$bus = new EventBus(vue);
    vue.mixin({
      beforeDestroy() {
        this.$bus.off({ scope: this });
      }
    });
  }
};
