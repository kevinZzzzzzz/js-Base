/* 
  发布订阅模式
*/
export default class Hooks {
  constructor() {
    this.listener = new Map()
  }
  // 订阅
  on(eventName, handler) {
    if (!this.listener.has(eventName)) {
      this.listener.set(eventName, [handler])
    } else {
      this.listener.get(eventName).push(handler)
    }
  }
  // 发布
  trigger(eventName, ...args) {
    const handlers = this.listener.get(eventName)
    let results = []
    if (handlers && handlers.length) {
      for (let fn of handlers) {
        const result = fn.call(this, ...args)
        results.push(result)
      }
    }
    return results
  }
  // 取消订阅
  off(eventName, handler) {
    const handlers = this.listener.get(eventName)
    if (handlers) {
      this.listener.set(eventName, handlers.filter(_ => _ !== handler))
    }
  }
  // 清除订阅
  destroy() {
    this.listener.clear()
  }
}