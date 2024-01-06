function throttle(fn, delay) {
  let prev = new Date()
  return function() {
    let self = this
    let now = new Date()
    if (now - prev >= delay) {
      fn.apply(self)
      prev = now
    }
  }
}

// 延时器做法
function throttle1(fn, delay) {
  let timer = null
  return function() {
    let self = this
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(self)
        timer = null
      }, delay)
    }
  }
}