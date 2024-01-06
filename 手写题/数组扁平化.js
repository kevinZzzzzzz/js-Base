//  1、递归实现
function flatten(arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}
// reduce函数
function flatten1(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten1(next) : next)
  }, [])
}
// 扩展运算符
function flatten2(arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
// toString和split
function flatten3(arr) {
  return arr.toString().split(',')
}
// es6 flat
function flatten4(arr) {
  return arr.flat(Infinity)
}
// 正则
function flatten5(arr) {
  let str = JSON.stringify(arr)
  str = str.replace(/(\[|\])/g, '')
  str = '[' + str + ']'
  return JSON.parse(str)
}