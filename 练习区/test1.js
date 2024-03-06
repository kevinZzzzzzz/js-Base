
var value = 2;
var obj1 = {
  value: 1,
};
function bar(name, age) {
  var myObj = {
    name: name,
    age: age,
    value: this.value,
  };
  console.log(this.value, myObj);
}
/* 
  手写call
*/
Function.prototype.myCall = function (context) {
  if (!context) {
    context = window;
  }
  const args = [...arguments].slice(1) || []; // 获取参数
  let fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];

  return result;
};
bar.myCall(null); // 2 {name: undefined, age: undefined, value: 2}
bar.myCall(obj1, 'tom', '110'); // 1 {name: "tom", age: "110", value: 1}

/* 
  手写apply
*/
Function.prototype.myApply = function (context) {
  if (!context) context = window

  const args = [...arguments][1] || []
  const fn = Symbol()
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]

  return result
}

bar.myApply(null) // 2 {name: undefined, age: undefined, value: 2}
bar.myApply(obj1, ['tom', '110']) // 1 {name: "tom", age: "110", value: 1}


/* 
  手写bind
*/
Function.prototype.myBind = function (context) {
  if (!context) context = window

  let fn = Symbol()
  context[fn] = this
  const args = [...arguments].slice(1) || []
  return function(...innerArgs) {
    context[fn](...[...args, ...innerArgs])
    delete context[fn]
  }
}
let obj = {
  objName: '我是obj传进来的name',
  objAge: '我是obj传进来的age',
};
function normalFun(name, age) {
  console.log(name); // '我是参数传进来的name'
  console.log(age); // '我是参数传进来的age'
  console.log(this); // 普通函数this指向绑定bind的第一个参数 也就是例子中的obj
  console.log(this.objName); // '我是obj传进来的name'
  console.log(this.objAge); // '我是obj传进来的age'
}
let bindFun = normalFun.myBind(obj, 'kevinZzzzzz');
bindFun('28', 24);

/* 
  柯里化
*/