// 柯里化的作用： 把一个多参函数变成一个单参函数
this.curry = function (func) {
  // 得到从下标1开始的参数
  var args = Array.prototype.slice.call(arguments, 1)
  var that = this
  // console.log(args, 'args')
  return function() {
    var curArgs = Array.from(arguments) // 当前调用的函数
    // console.log(curArgs, 'curArgs')
    var totalArgs = args.concat(curArgs)
    // console.log(totalArgs, 'totalArgs')
    if (totalArgs.length >= func.length) {
      // 参数数量够了
      return func.apply(null, totalArgs)
    } else {
      // 参数不够
      totalArgs.unshift(func)
      return that.curry.apply(that, totalArgs)
    }
  }
}