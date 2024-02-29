/* 
  函数柯里化
    将使用多个参数的一个函数,转换成一系列使用一个参数的函数
  原理：
    用闭包将函数保存起来，当参数的长度等于原函数时，将开始执行原函数
*/
function myCurry(fn) {
  // fn.length 表示函数中参数的个数，不包括剩余参数，仅仅包括了第一个有默认值之前的参数个数（不包括有默认值的参数）
  if (fn.length <= 1) return fn
  function generator(...args) {
    if (fn.length === args.length) {
      return fn.call(this, ...args)
    } else {
      return (...args1) => {
        console.log(args, 'args-------');
        console.log(args1, 'args1-------');
        return generator(...args, ...args1) // 把参数存起来
      }
    }
  }
  return generator
}

function fn (a, b, c, d) {
  return a + b + c + d
}
let fn1 = myCurry(fn)
console.log(fn1(1)(2)(3)(4))
console.log('-----------------------------------------------');

function fun(args) {
  return Array.from(args).reduce((pre, cur) => pre + cur, 0)
}
function selfCurry(fn) {
  let arg = [].slice.call(arguments, 1) // 取出剩余参数
  function generator(...args) {
    arg = arg.concat(Array.from(args))
    let result = fn.call(this, arg)
    console.log(result)
    return generator
  }
  return generator
}
// let fn2 = selfCurry(fun)
// console.log(fn2(1)(2)(3)(4)(5))