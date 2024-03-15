/**
 * 什么是原型链？
 * 当我们访问一个对象的某个属性或者方法时，会先从对象的自身上找，如果找不到的话，会往该对象的原型上找，
 * 如果原型上找不到的话，会往原型的原型上去找，这样一来就形成一条链式的结构，称为原型链
 * 
 * 如何检验一个属性或者方法是对象本身所有的？
 * (object).hasOwnProperty('')方法
 * 
 * 原型链的顶端是Object
 * hasOwnProperty方法是属于Object上的
 * Object的_proto_为null
*/

// Object.create(null) 新建的对象是没有__proto__属性的。

/**
 *  instanceof 作类型判断
 * 在原型链上一层一层查找，找constructor.prototype 是否存在于原型链上。
 * */
const object = {} 
const array = []
console.log('result object(object)', typeof object)
console.log('result object(array)', typeof array)

const flagObject = object instanceof Array
const flagArray = array instanceof Array
console.log('result object(instanceof)', object.__proto__, Array.prototype)
console.log('result object(instanceof)', array.__proto__, array.__proto__ === Array.prototype)


// 继承
// 原型链继承将一个类型的实例赋值给另外一个构造函数的原型实现的
// 弊端:1.原型属性上的引用类型会被所有实例共享，当有多个实例化对象的时候，操作某一个的引用类型，其他实例都会跟着改变 
// 2.无法对父类进行传参
// 3.类型的原型上的 constructor 属性被重写，解决：在将一个实例赋值给另一个构造函数的原型后，要将构造函数原型的构造器指向构造函数自己
function Parent() {
    this.name = '哈哈哈哈哈'
}
Parent.prototype.getName = function () {
    return this.name
}
function Child() {
}
Child.prototype = new Parent()
// 解决子类型的原型上的 constructor 属性被重写问题
Child.prototype.constructor = Child
const child1 = new Child()
const child2 = new Child()
child1.name = 'heiIx'
// 每一个构造函数都有一个原型对象，原型对象包含一个指向构造函数的指针，而每个实例都包含一个指向构造函数的原型对象的内部指针__proto__
console.log(Child.constructor.prototype === Child.__proto__)
console.log(child1.__proto__ === Child.prototype)
console.log(Child.prototype.__proto__ === Parent.prototype)
console.log(Parent.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)
console.log(child1.name)
console.log(child2.name)
console.log('>>>>>>>>>>>>>')

// 构造函数继承： 在子类的构造函数中进行父类的构造函数，并且改变this指向
// 弊端：1、子类不能继承父类原型上的方法和属性
function Parent1(name) {
    this.name = [name]
}
Parent1.prototype.getName = function() {
    return this.name
}
// 在子类的构造函数中，执行父类的构造函数，并且通过call绑定子类的this
function Child1() {
    Parent1.call(this,'hahaha')
}
let child11 = new Child1()
let child22 = new Child1()
child11.name[0] = 'ooooo'
console.log(child11.name)
console.log(child22.name)
// console.log(child11.getName()) //child11.getName is not a function
console.log('>>>>>>>>>>>>>')

// 组合继承 = 原型链继承 + 构造函数继承
// 缺点: 每执行一次子类的new操作都会重复执行父类的构造函数’Parent11.call(this, 'kevin')和new Parent11()‘
function Parent11(name) {
    this.name = [name]
}
Parent11.prototype.getName = function() {
    return this.name
}
function Child11() {
    Parent11.call(this, 'kevin')
}
Child11.prototype = new Parent11() // 为子类增加一些不必要的属性浪费内存
Child11.prototype.constructor = Child11
let child111 = new Child11()
let child221 = new Child11()
child111.name[0] = 'ooooo'
console.log(child111.name)
console.log(child221.name)
console.log(child221.getName())
console.log(child111.getName())


// 寄生式组合继承 babel把es6转换成es5的写法原理
function Parent112(name) {
    this.name = [name]
}
Parent112.prototype.getName = function() {
    return this.name
}
function Child112() {
    Parent112.call(this, 'kevin')
}
// Child112.prototype = Parent112.prototype // 会导致子类原型改点内容势必会影响到父类原型
Child112.prototype = Object.create(Parent112.prototype)
Child112.prototype.constructor = Child112
let child1112 = new Child112()
let child2212 = new Child112()
child111.name[0] = 'ooooo'
console.log(child1112.name)
console.log(child2212.name)
console.log(child2212.getName())
console.log(child1112.getName())
