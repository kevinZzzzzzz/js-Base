import b2 from './b.js'

setTimeout(() => {
  console.log('b2------.js', JSON.stringify(b2));
  b2.num--
  b2.obj.name = 'change2'
  console.log('b2----------.js', JSON.stringify(b2));
}, 2000);

setTimeout(() => {
  console.log('b2----.js', JSON.stringify(b2));
}, 4000)