function debounce(fn, delay) {
  let timer = null
  return function() {
    let self = this
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    time = setTimeout(() => {
      fn.apply(self)
    }, delay)
  }
}