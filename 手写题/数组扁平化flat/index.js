/* 
  手写扁平化函数flatten
  @params
    deep 数组扁平程度 number
*/
Array.prototype.myFlat = function(deep = 1) {
  let arr = this
  if (deep === 0) return arr
  return arr.reduce((pre, cur) => {
    if (Array.isArray(cur)) {
      return [...pre, ...cur.myFlat(deep - 1)]
    } else {
      return [...pre, cur]
    }
  }, [])
}

let arr1 = [1, [2, 3, [4, 5, 6, [7, 8, [9]]]]]
let arr2 = arr1.myFlat(2)
console.log(JSON.stringify(arr2))
let arr3 = arr1.myFlat(3)
console.log(JSON.stringify(arr3))
let arr4 = arr1.myFlat(4)
console.log(JSON.stringify(arr4))