import b1 from './b.js'

setTimeout(() => {
  console.log('b.js', JSON.stringify(b1));
  b1.num--
  b1.obj.name = 'change'
  console.log('b1.js', JSON.stringify(b1));
}, 1000);

setTimeout(() => {
  console.log('b2.js', JSON.stringify(b1));
}, 3000)