/* 
  Promise的基本原理
    - 首先我们在调用promise时，会返回一个Promise对象
    - 构建Promise对象时，需要传入一个回调函数fn，Promise的主要业务流程都在回调函数中执行
    - 如果运行在回调函数中的业务执行成功了，会调用resolve函数；如果执行失败了，则会调用reject函数
    - Promise的状态时不可逆的，同时调用resolve函数和reject函数，默认会采取第一次调用的结果

  Promise的链式调用
    - then 返回一个Promise
    - 下一个then需要拿到上一个then的返回值
    - 有异步操作时，后一个回调函数，会等待该promise对象的状态发生变化，在被调用
    - 有异步操作的话，既有任务队列，需要有收集回调函数的队列
*/
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class Promise {
  constructor(fn) {
    this.resolveTask = []
    this.rejectTask = []
    this.state = PENDING
    this.data = null
    this.error = null

    let resolve = value => {
      if (this.state !== 'pending') return
      this.state = FULFILLED
      this.data = value
      setTimeout(() => {
        this.resolveTask.forEach((cb) => cb(value)) 
      });
    }
    let reject = err => {
      if (this.state !== 'pending') return
      this.state = REJECTED
      this.error = err
      setTimeout(() => {
        this.rejectTask.forEach(cb => cb(err)) 
      });
    }

    try {
      fn(resolve, reject)
    } catch(err) {
      reject(err)
    }
  }

  then(resolveCallback, rejectCallback) {
    return new Promise((resolve, reject) => {
      this.resolveTask.push(() => {
        const res = resolveCallback(this.data)
        if (res instanceof Promise) {
          res.then(resolve, reject)
        } else {
          resolve(res)
        }
      })

      this.rejectTask.push(() => {
        const res = rejectCallback(this.error)
        if (res instanceof Promise) {
          res.then(resolve, reject)
        } else {
          reject(res)
        }
      })
    })
  }
}