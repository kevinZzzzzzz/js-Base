// 利用 贪心算法 + 二分查找 获取原始的最长递增子序列，时间复杂度：O(NlogN)

/* 
  思路：
    遍历数组，如果当前这一项比我们最后一项大则直接放到末尾
    如果当前这一项比最后一项小，需要在序列中通过二分查找找到比当前大的这一项，用他来替换掉
    前驱节点追溯，替换掉错误的节点
*/
// function getSequence(arr) {
//   const len = arr.length;
//   const result = [0] // 默认以数组的第0个为基准来做序列，存储的是数组索引
//   let resultLastIndex = 0; // 当前序列的最后一个元素索引

//   for (let i = 0; i < len; i++) {
//     let arr1 = arr[i];
//     if (arr1 !== 0) { // 因为在vue newIndexToOldIndexMap 中，0代表需要创建新元素，无需进行位置移动操作
//       resultLastIndex = result[result.length - 1]
//       console.log(resultLastIndex)
//       if (arr1 > arr[resultLastIndex]) {
//         // 比较当前项和最后一项的值，如果大于最后一项，则将当前索引添加到结果集中
//         result.push(i)
//         continue
//       }
//     }
//   }
//   return result
// }
function getSequence(arr) {
  const dp = new Array(arr.length).fill(1);
  const result = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    // 如果这个数大于 result 的最后一个数，直接插入
    if (arr[i] > result[result.length - 1]) {
      result.push(arr[i]);
      dp[i] = result.length;
    } else {
      // 否则，通过二分查找找到该数字应该在的位置，从而得到 dp
      let l = 0,
        r = result.length - 1,
        m = Math.floor((l + r) / 2);
      while (l <= r) {
        if (result[m] < arr[i]) {
          l = m + 1;
        } else {
          r = m - 1;
        }
        m = Math.floor((l + r) / 2);
      }
      result[l] = arr[i];
      dp[i] = l + 1;
    }
  }

  console.log(result, 'result')
  // result 不一定是正确的最长递增序列，中间有些数有可能被替换了
  // 所以需要再走一遍构建 result 的逻辑
  let max = Math.max(...dp);
  for (let i = arr.length - 1; max > 0; i--) {
    if (dp[i] === max) {
      result[max - 1] = arr[i];
      max--;
    }
  }
  console.log(dp);
  return result;
}
console.log(getSequence([3, 7, 22, 4, 8, 13, 9, 11, 12]));
