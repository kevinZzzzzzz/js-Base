/* new 的原理
new 做了哪些事？
- 创建一个新对象
- 将新对象连接到构造函数原型上
- 绑定this指向新对象，执行构造函数，为新对象添加属性
- 返回这个新对象
new 关键词执行之后总是会返回一个对象，要么是实例对象，要么是return一个和this无关普通对象(不会走步骤生成this对象)
如果返回一个基本类型数据，则仍然会返回一个实例对象 */

/* 
    手写new函数
    用create表示new函数
*/
function create(fn, ...args) {
    // 创建一个新对象
    let obj = {}
    // 将新对象连接到构造函数的原型上
    // obj.__proto__ = fn.prototype
    obj.setPrototype(fn.prototype)
    // 改变this指向，执行构造函数，为新对象添加属性
    fn.apply(obj, args)
    // 返回对象
    return obj
}

function create(fn, ...arg) {
    const obj = Object.create(fn.prototype) // 包括创建一个新对象并且为新对象设置原型链，即连接到构造函数的原型上
    fn.apply(obj, ...arg)
    return obj
}

function Person(name) {
    this.name = name
}
let a = new Person('hehe')
let aa = create(Person, 'haha')

console.log(a)
console.log(aa)