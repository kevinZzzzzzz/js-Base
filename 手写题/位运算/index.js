// 用位运算时下权限控制
const READ = 0b1 // 0001
const WRITE = 0b10 // 0010
const UPDATE = 0b100 // 0100
const DELETE = 0b1000 // 1000

// 运用位运算 或运算｜
const READ_WRITE_UPDATE = READ | WRITE | UPDATE // 0111 => 7

let role = 13

// 与运算
if (role & READ) {
  console.log('可读权限')
} else {
  console.log('无可读权限')
}


// 去掉某个权限 异或运算^
const newRole = role ^ READ
if (newRole & READ) {
  console.log('可读权限')
} else {
  console.log('无可读权限')
}

// 妙用位运算
/* 
  nums数组中包含1个或多个正整数
  其他的数字都出现2次
  只有一个数字只出现一次
  找出出现一次的数字
*/
// 核心：异或运算 0跟任何数异或为本身
function uniqueNumber(nums) {
  let result = 0
  for (let num of nums) {
    result ^= num
  }
  return result
  // return nums.reduce((a, b) => a ^ b, 0)
}

console.log(uniqueNumber([1, 2, 3, 4, 5, 3, 2, 4, 1]))