/* 
  防抖函数
  利用闭包，不管触发频率多高，在停止触发n秒后才会执行，如果重复触发，会清空之前的定时器，重新计时，直到最后一次n秒后执行
*/
function debounce(cb, delay = 1000, flag) {
  let timer = null
  return function(...args) {
    let self = this
    if (timer) {
      clearTimeout(timer)
    }
    if (flag && !timer) { // 首次执行
      cb.call(self, ...args)
    }
    timer = setTimeout(() => {
      cb.call(self, ...args)
    }, delay);
  }
}
let debounceFn = debounce((a) => {
  console.log("执行:", a);
}, 1000, true);
debounceFn(1);
debounceFn(2);
debounceFn(3);
