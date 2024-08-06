/* 
  new 操作过程中的四件事情
  1、首先创建一个新的空对象
  2、设置原型，将新对象的原型 与 构造函数的原型对象绑定
  3、改变this指向，并执行构造函数，为新对象添加属性
  4、判断函数的返回值类型，如果是普通类型，则返回创建的对象，如果是引用类型，则返回这个引用类型对象
  · 使用方法
  objectFactory(构造函数, 初始化参数);
*/
function objectFactory(fn, ...args) {
  if (typeof fn !== "function") {
    console.log("type Error");
    return;
  }
  let newObject = Object.create(fn.prototype);
  let result = fn.bind(newObject)(...args);
  // 判读函数返回的类型， 如果是普通类型则返回创建的对象，如果是引用类型则返回这个构造函数执行的结果
  return result && (typeof result === "object" || typeof result === "function")
    ? result
    : newObject;
}
