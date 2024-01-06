/* 
  手写apply函数
  特点：只能传两个参数，第一个是绑定的对象，第二个是数组-装参数
*/

function myApply(ctx) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  let result = null
  let context = ctx || window
  context.fn = this
  if(arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}