/* 
  发布订阅模式
  理解：先订阅监听 再发布触发
    订阅： 将订阅者所执行的事件装到一块
    发布: 待发布完成后，依次执行所有订阅者的事件
*/

class BusClass {
  constructor() {
    this.eventMap = new Map() // 存储事件
  }
  // 触发 发布
  emit (name, ...args) {
    const eventArr = this.eventMap.get(name)
    if (eventArr && eventArr.length > 0) {
      eventArr.forEach(fn => {
        fn.call(this, ...args)
      })
    }
  }
  // 监听 订阅
  on (name, callback) {
    if (this.eventMap.has(name)) {
      const fn = this.eventMap.get(name)
      fn.push(callback)
    }
    this.eventMap.set(name,  fn)
  }
  // 只订阅一次
  once(name) {
    if (this.eventMap.has(name)) {
      this.emit(name, ...args)
      this.eventMap.delete(name)
    }
  }
  // 取消监听
  off(name) {
    this.eventMap.delete(name)
  }
}