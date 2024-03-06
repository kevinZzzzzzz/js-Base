/* 
  手写call函数
  特点：可以传多个参数，第一个参数绑定的对象(ctx)， 第二个参数起则是函数执行的传参
*/
function myCall(ctx) {
  if (typeof this !== 'function') {
    console.error('type error')
  }
  
  let args = [...arguments].slice(1) // 获取参数值

  let context = ctx || window // 指定上下文对象
  context.fn = this // 将函数作为上下文对象一个属性
  let result = context.fn(...args)

  delete context.fn // 删除新增的属性
  return result
}

// 简易版
Function.prototype.mu_call = function (context, ...args) {
  if (!context) context = window
  let fn = Symbol()

  context[fn] = this
  return context[fn](...args)
}
