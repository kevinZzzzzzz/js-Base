// 手写Object.create
// 思路：将传入的对象作为原型（使用现有的对象作为新创建的对象的__proto__（‌即原型）‌）
function Create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
