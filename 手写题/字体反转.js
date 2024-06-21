/**
 * 字体反转abcde -> edcba
 */

const reversalStr = (str) => {
  console.log(Array.from(str))
  return str.split('').reduce((pre, cur) => {
    return `${cur}${pre}`
  }, '')
}
console.log(reversalStr('abcde'))