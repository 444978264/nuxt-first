export class EventEmitter {
  constructor(channel) {
    this.channel = channel;
    this.emitHandles = new Set();
    this.oldVal = undefined;
    this.value = undefined;
  }

  size() {
    return this.emitHandles.size;
  }

  val(val) {
    const isUndefined = val === undefined;
    if (!isUndefined) {
      this.oldVal = this.value;
      this.value = val;
    }
    return isUndefined ? this.value : val;
  }

  getChannel() {
    return this.channel;
  }

  on(fn) {
    this.emitHandles.add(fn);
    return this;
  }

  emit(value) {
    this.emitHandles.forEach(fn => {
      fn && fn(value);
    });
    return this;
  }

  off(fn) {
    if (fn) {
      this.emitHandles.delete(fn);
    } else {
      this.emitHandles.clear();
    }
    return this;
  }
}
