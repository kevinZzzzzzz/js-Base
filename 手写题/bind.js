/* 
  手写bind函数
  核心：柯里化（只传递一部分参数，利用返回一个函数去处理剩余的参数）
  特点：不会立即执行，而会返回一个函数
*/
function myBind(ctx) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let args = [...arguments].slice(1);
  let fn = this;
  return function Fn() {
    return fn.apply(
      this instanceof Fn ? this : ctx, // 根据调用方式，传入不同绑定值
      args.concat(...arguments)
    );
  };
}

// const testBind = (ctx) => {
//   const args = [...arguments].slice(1);
//   const context = ctx || window;
//   context.fn = this;
//   return function () {
//     return context.fn.apply(ctx, args.concat(...arguments));
//   };
// };
/* 
  完整版
*/
Function.prototype.bind2 = function (ctx) {
  if (typeof this != "function") {
    throw new Error("Error");
  }

  let self = this;
  let args = Array.prototype.slice.call(arguments, 1);
  let fNop = function () {};

  let fBound = function () {
    let bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNop ? this : ctx, args.concat(bindArgs));
  };
  fNop.prototype = this.prototype;
  fBound.prototype = new fNop();
  return fBound;
};
