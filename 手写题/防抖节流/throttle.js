/* 
  节流函数
  利用闭包，不管触发频率多高，每隔一段时间内执行一次
*/
function throttle(fn, delay, flag) {
  let prev = Date.now()
  return function(...args) {
    let self = this
    let now = Date.now()
    if (flag) {
      fn.call(self, ...args) // 首次执行
      flag = false
    }
    if (now - prev >= delay)  {
      fn.call(self, ...args)
      prev = now
    }
  }
}
const throttleFn = throttle((a) => {
  console.log('执行：', a)
}, 1000, true)
for(let i = 0; i <= 5; i++) {
  setTimeout(() => {
    throttleFn(i)
  }, i * 500);
}