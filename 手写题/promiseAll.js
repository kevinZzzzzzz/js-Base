// Promise.all([]).then((res) => {
//   console.log(res)
// })

Promise.myAll = function(proms) {
  let res, rej
  const p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })
  let i = 0
  let fulfilled = 0
  const result = []
  // 统计传入数量
  for (const prom of proms) {
    const index = i // 闭包 块级作用域
    i++
    // 强转为promise
    Promise.resolve(prom).then((data) => {
      // 1 把完成的数据汇总到最终结果
      result[index] = data
      // 2 判断是否全部完成
      fulfilled++
      if (fulfilled == i) { // 此处是异步的， i已经遍历完成
        res(result)
      }
    }, rej)
  }
  if (i == 0) {
    res([])
  }
  return p
}
Promise.myAll([1,2,3,Promise.resolve(123)]).then((result) => {
  console.log(result)
}, err => {
  console.log('err', err)
})
Promise.myAll([1,2,3]).then((result) => {
  console.log(result)
}, err => {
  console.log('err', err)
})


/* 
  什么是promise
  当有一个符合promise A+规范的then方法的对象就是一个promise
  而es6出现之后，提供一个构造函数，能够满足PromiseA+规范的promise对象
*/