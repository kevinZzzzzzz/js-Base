/* 
  手写filter函数
  @params fn 处理函数
*/
Array.prototype.myFilter = function(fn) {
  if (Object.prototype.toString.call(fn) != '[object Function]') {
    throw new TypeError('fn is not a function')
  }
  let arr = this.slice() // 浅拷贝
  let result = []

  for (let i = 0; i < arr.length; i++) {
    if (fn.call(this, arr[i], i, arr)) {
      result.push(arr[i])
    }
  }
  return result
}

let a = [1,2,3,4,5,6,7,8,9]
let a1 = a.myFilter(i => {
  return i >= 5
})
console.log(a1)