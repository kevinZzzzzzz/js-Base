const num = 0
const obj = {
  name: 'raw'
}

module.exports = {
  num,
  obj
}

setTimeout(() => {
  console.log('raw', num, obj)
}, 5000);