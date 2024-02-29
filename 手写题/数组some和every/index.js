/* 
  手写数组some函数
  @params
    fn 处理函数
*/
Array.prototype.mySome = function(fn) {
  if (Object.prototype.toString.call(fn) != '[object Function]') {
    throw new TypeError('fn is not a function')
  }
  let arr = this.slice()
  let len = arr.length
  let result = 0
  for(let i = 0; i < len; i++) {
    if(fn.call(this, arr[i], i, arr)) {
      result++
      break
    }
  }
  return result > 0
}
let a = [1,2,3,4,5,6,7,8]
let flag = a.mySome(d => {
  return d > 1
})
let flag1 = a.mySome(e => {
  return e > 10
})
console.log(flag)
console.log(flag1)

/* 
  手写数组every函数
  @params
    fn 处理函数
*/
Array.prototype.myEvery = function(fn) {
  if (Object.prototype.toString.call(fn) != '[object Function]') {
    throw new TypeError('fn is not a function')
  }
  let arr = this.slice()
  let len = arr.length
  let result = 0
  for(let i = 0; i < len; i++) {
    if(fn.call(this, arr[i], i, arr)) {
      result++
    }
  }
  return result === len
}
let a1 = [1,2,3,4,5,6,7,8]
let flag2 = a.myEvery(d => {
  return d >= 1
})
let flag3 = a.myEvery(e => {
  return e > 10
})
console.log(flag2)
console.log(flag3)