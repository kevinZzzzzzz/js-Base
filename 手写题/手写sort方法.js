/* 
  手写数组sort方法 mySort
  原理冒泡排序，两次遍历将极大值的数据往一边挪
  正序：(a, b) => a - b
  倒序：(a, b) => b - a
*/

Array.prototype.mySort = mySort

function mySort(cb) {
  !cb && (cb = (a, b) => a - b)

  for (let i = 0; i < this.length - 1; i++) {
    for (let j = 0; j < this.length - 1 - i; j++) {
      if (cb(this[j], this[j + 1]) > 0) {
        [this[j], this[j + 1]] = [this[j + 1], this[j]]
      }
    }
  }
  return this
}
let arr = [2, 9, 6, 7, 4, 3, 1, 7, 0, -1, -2]
console.log(arr.mySort((a, b) => {
  return b - a
}))