/**
 * promise 一共有三个状态，且一旦状态改变之后就不能转变
 * pending(初始状态) resolved rejected
*/
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

/* 
  简化版
*/
class MyPromise {
  constructor(fn) {
    this.state = 'pending';
    this.value = null
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'resolved'
        this.value = value
        console.log(this.resolvedCallbacks)
        this.resolvedCallbacks.forEach(fn => fn(this.value))
      }
    }
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'reject'
        this.value = reason
        this.rejectedCallbacks.forEach(fn => fn(this.value))
      }
    }
    
    try {
      fn(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      switch (this.state) {
        case 'pending':
          this.resolvedCallbacks.push((value) => {
            const result = onFulfilled(value)
            result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
          })
          this.rejectedCallbacks.push((reason) => {
            const result = onRejected(reason)
            result instanceof MyPromise ? result.then(resolve, reject) : reject(result)
          })
          break
        case 'resolved':
          try {
            const result = onFulfilled(this.value) // 承前，获取上一次promise跟新状态的结果
            return result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)// 启后
          } catch (err) {
            reject(err)
          }
          break
        case 'reject':
          try {
            const result = onRejected(this.value)
            return result instanceof MyPromise ? result.then(resolve, reject) : reject(result)
          } catch (err) {
            reject(err)
          }
          break
      }

    })
  }
}
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 0);
});

promise.then(
  result => {
    console.log(result, 'result')
    return new MyPromise((res, rej) => {
      setTimeout(() => {
        res(result + '1')
      }, 0);
    })
  },
  error => console.error(error)
).then((res) => {
  console.log(res, 'res') 
})




// function MyPromise(fn) {
//   // 保存前一个promise的this
//   let self = this
//   // 初始化状态
//   this.state = PENDING
//   // 用于保存resole或者reject的值
//   this.value = null

//   this.resolvedCallback = [] // 用于保存resolve的回调函数
//   this.rejectedCallback = [] // 用于保存reject的回调函数

//   function resolve(value) {
//     // 判断传入的元素是否为Promise，是的话状态改变必须等待前面一个状态改变后执行
//     if (value instanceof MyPromise) {
//       return value.then(resolve, reject)
//     }
//     // 保证代码的执行顺序为本轮事件循环的末尾
//     setTimeout(() => {
//       // 必须在状态为pending时才能转变
//       if (self.state === 'pending') {
//         self.state = 'resolved'
//         self.value = value
//         console.log(self.resolvedCallback, 'resolve')
//         self.resolvedCallback.forEach(cb => {
//           cb(value)
//         })
//       }
//     }, 0)
//   }

//   function reject(value) {
//     // 保证代码的执行顺序为本轮事件循环的末尾
//     setTimeout(() => {
//       if (self.state === 'pending') {
//         self.state = 'rejected'
//         self.value = value
//         self.rejectedCallback.forEach(cb => {
//           cb(value)
//         })
//       }
//     }, 0)
//   }

//   // 这里属于同步任务
//   try {
//     fn(resolve, reject)
//   } catch (err) {
//     reject(err)
//   }
// }
// // then方法返回一个新的promise实例
// /* 
// ● 承前：当前一个 promise 完成后，调用其 resolve 变更状态，在这个 resolve 里会依次调用 callbacks 里的回调，这样就执行了 then 里的方法了
// ● 启后：上一步中，当then里的方法执行完成后，返回一个结果，如果这个结果是个简单的值，就直接调用新promise的resolve，让其状态变更，这又会依次调用新promise的callback数组里的方法，循环往复。。如果返回的结果是个promise，则需要等它完成之后再触发新promise的resolve，所以可以在其结果的then里调用新promise的resolve
// */
// MyPromise.prototype.then = function (res, rej) {
//   // 保存前一个promise的this
//   const self = this
//   return new MyPromise((resolve, reject) => {
//     // 前一个promise成功时执行的函数
//     let fulfilled = () => {
//       try {
//         const result = res(self.value) // 承前，获取上一次promise跟新状态的结果
//         return result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)// 启后
//       } catch (err) {
//         reject(err)
//       }
//     }
//     // 前一个promise失败时执行的函数
//     let rejected = () => {
//       try {
//         const result = rej(self.reason)
//         return result instanceof MyPromise ? result.then(resolve, reject) : reject(result)
//       } catch (err) {
//         reject(err)
//       }
//     }
//     switch (self.status) {
//       case PENDING:
//         self.resolvedCallback.push(fulfilled)
//         self.rejectedCallback.push(rejected)
//         break;
//       case RESOLVED:
//         fulfilled()
//         break;
//       case REJECTED:
//         rejected()
//         break
//     }
//   })
// }