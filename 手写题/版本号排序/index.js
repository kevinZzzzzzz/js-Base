
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


const a = [1,4,3,2,4,6,4,7,8,4]
console.log(a.sort((a, b) => {
  return a - b
}))
5