const num = 0
const obj = {
  name: 'raw'
}

export default {
  num,
  obj
}
setTimeout(() => {
  console.log('raw', num, obj)
}, 5000);