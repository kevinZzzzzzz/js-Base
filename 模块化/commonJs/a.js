const a1 = require('./b.js');

setTimeout(() => {
  console.log('b.js', JSON.stringify(a1));
  a1.num--
  a1.obj.name = 'change'
  console.log('b1.js', JSON.stringify(a1));
}, 1000)

setTimeout(() => {
  console.log('b2.js', JSON.stringify(a1));
}, 3000)