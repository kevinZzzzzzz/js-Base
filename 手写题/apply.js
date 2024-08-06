/* 
  手写apply函数
  特点：只能传两个参数，第一个是绑定的对象，第二个是数组-装参数
*/
/**
 * 将函数作为对象的方法调用，并传入指定的参数列表
 * 如果没有传入上下文对象，则默认使用全局对象 window
 * @param {Object} ctx - 上下文对象
 * @throws {TypeError} - 如果调用 myApply 的不是函数，将抛出错误
 * @return {*} - 函数调用的返回值
 */
function myApply(ctx) {
  if (typeof this !== "function") {
    throw new TypeError("error");
  }
  let result = null;
  let context = ctx || window;
  context.fn = this;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
}
