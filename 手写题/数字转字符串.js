/* 
【代码题】数字转字符串
  样例输入：1234567890
  样例输出：1,234,567,890
*/
function toString(num) {
  // 最简单的方式
  // return num.toLocaleString()
  const res = []
  const str = `${num}`.split('').reverse()
  for (let i = 0; i < str.length; i++) {
    if ( i && i % 3 === 0) {
      res.push(',')
    }
    res.push(str[i])
  }
  return res.reverse().join('')
}
console.log(toString(1234567890))