/* 
  手写reduce
  @params
    fn: 回调函数
    initialValue: 初始值
*/
Array.prototype.myReduce = function(fn, initialValue) {
  let pre, index
  let arr = this.slice()
  if (initialValue === undefined) {
    for(let i = 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(i)) continue // 遇到不存在的数 直接跳过
      pre = arr[i]
      index = i + 1
      break // 确定完pre值后 直接跳出
    }
  } else {
    index = 0
    pre = initialValue
  }
  for (let i = index; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    pre = fn.call(null, pre, arr[i], i, this)
  }
  return pre
}
let arr = [1,2,3,4,5,6,7,8,9]
let amount = arr.myReduce((pre, cur) => pre + cur, 0)
console.log(amount)