/* 
  函数柯里化
  概念：一种将使用多个参数的函数转换成一系列使用一个参数的函数的技术
*/

// 1. 实现一个add函数，接收n个参数，返回一个函数，返回的函数接收m个参数，返回m+n的结果
function add(...args) {
  return function(...args2) {
    return args.concat(args2).reduce((a, b) => a + b);
  }
}
console.log(add(1,2,3,4)(5,6,7,8,9))
// 2. 实现一个curry函数，接收一个函数f和一个参数列表args，返回一个函数，返回的函数接收一个参数，返回f(args + 参数)的结果
function curry(f, ...args) {
  return function(...args2) {
    return f(...args.concat(args2));
  }
}

/**
 * 实现一个柯里化curry
 */
function curry(...args1) {
  let params = args1
  const addFn = (...args2) => {
    params = params.concat(args2)
    return addFn
  }
  addFn.valueOf = () => {
    return params.reduce((a, b) => a + b, 0)
  }
  return addFn
}
console.log(curry(1,2,3)(4).valueOf())
console.log(curry(1,2)(3,4)(5).valueOf())
console.log(curry(1)(2)(3)(4,5,6)(7).valueOf())