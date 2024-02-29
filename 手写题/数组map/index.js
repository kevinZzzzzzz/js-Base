/* 
  数组map方法
  @params: 
    fn 处理函数 arr[i]、i
*/
Array.prototype.myMap = function(fn) {
  if (Object.prototype.toString.call(fn) !== '[object Function]') {
    throw new TypeError('fn is not a function')
  }
  let arr = this.slice()
  let list = new Array(arr.length)
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      list[i] = fn.call(this, arr[i], i, arr)
    }
  }
  return list
}
let a = [1,2,3,4,5,6,7,8,9]
let a1 = a.myMap((a) => {
  return a + 1
})
console.log(a1)