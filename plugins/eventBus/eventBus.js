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

    const namespace = this.getNameSpace(scope);

    this._hasChannel(channel, emitter => {
      if (!emitter) {
        const event = new EventEmitter(channel).on(fn);
        return this.busCollection.set(channel, event);
      }
      emitter.value && fn(emitter.value);
      emitter.on(fn);
    });

    this._hasScope(namespace, emitter => {
      if (!emitter) {
        return this.scopeChannel.set(namespace, {
          [channel]: [fn]
        });
      }
      emitter[channel].push(fn);
    });

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

    this._hasScope(namespace, emitter => {
      if (!emitter && channel) {
        return this.busCollection.get(channel).off(fn);
      }
      Object.entries(emitter).forEach(([key, values]) => {
        const emitter = this.busCollection.get(key);
        while (values.length) {
          emitter.off(values.pop());
        }
        // 注销 事件
        if (!emitter.size()) this.busCollection.delete(key);
      });
      this.scopeChannel.delete(namespace);
    });

    return this;
  }

  _hasScope(namespace, callback) {
    const has = namespace && this.scopeChannel.has(namespace);
    callback && callback(has && this.scopeChannel.get(namespace));
  }

  _hasChannel(channel, callback) {
    const has = channel && this.busCollection.has(channel);
    callback && callback(has && this.busCollection.get(channel));
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
