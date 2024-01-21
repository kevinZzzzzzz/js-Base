
const compareVer = (versions) => {
  return versions.sort((a, b) => {
    const tempA = a.split('.')
    const tempB = b.split('.')
    const maxLen = Math.max(tempA.length, tempB.length)
    for (let i = 0; i < maxLen; i++) {
      const valueA = +tempA[i] || 0
      const valueB = +tempB[i] || 0
      if (valueA === valueB) {
        continue
      }
      return valueA - valueB
    }
    return 0
  })
}
console.log(compareVer(['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']))


const a = [33,32,31,'abc','cde',5,6,33,'aa','bb',1,2,3];
// const a = [33,32,31,'abc','cde',5,6,31,'aa','bb',1,2,3];
// console.log(a.sort((a, b) => {
//   if (typeof a === 'number' && typeof b === 'number') {
//     return a - b;
//   } else {
//     return String(a).localeCompare(String(b));
//   }
// }))
console.log(a.sort((a, b) => {
  return a - b
}))