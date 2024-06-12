let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// 乱序操作
const arr1 = arr.sort(() => Math.random() - 0.5);
console.log(arr1)
function shuffleArray(arr) {
  let j
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i)
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
console.log(shuffleArray(arr))
/* 
  排序操作1
  快速排序---二分法
*/
const quickSort = (arr) => {
  if (arr.length <= 1) return arr
  let index = arr.length >> 1  // 除2并向下取整
  let mid = arr.splice(index, 1)[0] // 去除中位数
  let left = []
  let right = []

  let i = 0
  while (i < arr.length) {
    if (mid > arr[i]) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
    i++
  }
  // console.log(left, mid, right)
  return quickSort(left).concat([mid, ...quickSort(right)])
}
console.log(quickSort(arr1))

/* 
  排序操作2
  冒泡排序---双循环
*/
let BobbleSort = (arr) => {
  let len = arr.length
  // let tail = len - 1
  // for (let i = 0; i < tail; i++) {
  //   for (let j = 0; j < tail - i; j++) {
  //     if (arr[j] > arr[j + 1]) {
  //       [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
  //     }
  //   }
  // }
  // 双端遍历
  for (let i = len; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
console.log(BobbleSort(arr1))