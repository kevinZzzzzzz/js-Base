const btn = document.getElementById('btn')

let eventMap = new Map()
function timeout(time, cb) {
  return new Promise(() => {
    setTimeout(() => {
      cb()
    }, time);
  })
}
// 防抖函数
function debounce(fn, delay) {
  let timer = null
  return function() {
    let self = this
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(self)
    }, delay);
  }
}
// 节流函数
function throttle(fn, delay) {
  let pre = new Date()
  return function() {
    let self = this
    let now = new Date() 
    if (now - pre > delay) {
      pre = new Date()
      fn.apply(self)
    }
  }
}
btn.addEventListener('click', () => {
  if (eventMap.has('btn')) return false
  // 模拟请求
  const callback = () => {
    eventMap.set('btn', 'pending')
    console.log('start require')
    setTimeout(() => {
      // 完成了
      console.log('请求完成111111111')
      eventMap.delete('btn')
    }, 2000);
  }
  callback()
  timeout(1000, () => {
    !eventMap.has('btn') && callback()
  })
})

// const callback = () => {
//   console.log('start require')
//   setTimeout(() => {
//     console.log('请求完成111111111')
//   }, 2000);
// }
// btn.addEventListener('click', throttle(callback, 1000))