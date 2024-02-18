/* 
  用setTimeout实现倒计时setInterval
*/
const countDown = (count) => {
  setTimeout(() => {
    count--
    if (count > 0) {
      countDown(count)
    }
  }, 1000);
}
countDown(10)


/* 
  setInterval实现倒计时
*/
const count = 10
let timer = setInterval(() => {
  count--
  if (count > 0) {
    clearInterval(timer)
    timer = null
  }
}, 1000)