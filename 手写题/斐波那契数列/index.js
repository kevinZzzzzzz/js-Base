/* 
斐波那契数列
  计算第 N 项斐波那契数列的值
*/
/* 方法一 */
const fibonaci = (n) => {
  if (n <= 1) return 1
  return fibonaci(n - 1) + fibonaci(n - 2)
}
/* 方法二 */
const fibonaci2 = (n) => {
  if (n <= 1) {
    return n
  }
  let a = 0, b = 1
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b]
  }
  return b
}
const arr = []
for (let i = 0; i <= 10; i++) {
  arr.push(fibonaci2(i))
}
console.log(fibonaci2(10), arr)
/* 方法三 */
const fibonaci3 = (n) => {
  let a = 0, b = 1, c
  for (let i = 2; i <= n; i++) {
    c = a + b
    a = b
    b = c
  }
  return b
}


