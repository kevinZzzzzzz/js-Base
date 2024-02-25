/* 
  最长递增子序列(简易版)
*/
function LTS(nums) {
  if (nums.length === 0) return []
  const result = [[nums[0]]] // 多维数组

  for (let i = 1; i < nums.length; i++) {
    const n = nums[i]
    _update(n)
  }

  function _update(n) {
    // 根据倒序循环
    for (let i = result.length - 1; i >= 0; i--) {
      const line = result[i]
      const tail = line[line.length - 1]
      if (n > tail) {
        result[i + 1] = [...line, n]
        break
      } else if (n < tail && i === 0) {
        result[i] = [n]
      }
    }
  }
  // console.log(JSON.stringify(result))
  return result[result.length - 1]
}

console.log(LTS([4,5,1,2,7,3,6,9]))
/* 
  4
  4 5
  ......1
  1
  4 5
  ......2
  1
  1 2
  1 2 7
  ......3
  1
  1 2 3
  1 2 3 6
  1 2 3 6 9
*/
console.log(LTS([3, 7, 22, 4, 8, 13, 9, 11, 12]))