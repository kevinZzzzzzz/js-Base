
/* 
  1、typeof 不能判断null和引用数据类型Object Array  都会返回object
  2、instanceof 不能判断基本数据类型，原理是判断构造函数的原型是否在该对象的原型链上  fn.prototype === obj.__proto__
  3、constructor 仅支持基本类型且可以随意修改
  4、Object.prototype.toString.call()  返回[object xxx]
 */
function getType(value) {
  if (value === null) {
    return value + ''
  }
  if (typeof value === 'object') {
    let valueClass = Object.prototype.toString.call(value)
    let type = valueClass.split(" ")[1].split(" ").pop()
    return type.join("").toLowerCase()
  } else {
    return typeof value
  }
}