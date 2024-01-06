// 1 应用 将伪数组 转化为 数组
// 伪数组： 函数内的参数对象arguments 获取的dom元素  含有length的数组
/* 
1、Array.prototype.slice.call
2、展开运算符
*/
let div = document.getElementsByTagName('div')
console.log(div)
let arr2 = Array.prototype.slice.call(div)
console.log(arr2)
console.log([...div])

function listArray(listArray) {
    var arr = []
    for (let i = 0; i < listArray.length; i++) {
        arr[i] = listArray[i]
    }
    return arr
}
console.log(listArray(div))


// arguments
// 箭头函数是没有argumens对象的
function fn () {
    console.log(arguments)
    console.log(Array.prototype.slice.call(arguments))
    console.log(Array.prototype.slice.apply(arguments))
}
fn(1,2,3,4,5,6)

// 类数组

// 数组拼接
let arr11 = [1,2,3]
let arr22 = [5,6,7]
console.log(arr11.concat(arr22))
Array.prototype.push.call(arr11, ...arr22)
console.log(arr11)
Array.prototype.push.apply(arr22, arr11)
console.log(arr22)

// 判断类型
let array = [1,2,3,4]
function isArray(arr) {
    return Object.prototype.toString.call(array) === '[object Array]'
}
console.log(isArray(array))
/* 
    bind call apply，第一个参数是改变this指向的对象
    bind: 不会立即执行，回返回一个函数
    call: 可以有多个参数,
    apply: 只有两个参数，第二个参数是传参
*/

/**
 * call apply bind 的区别
 * 三个都能改变this指向，第一个参数是指向的实例
 * 1、call和apply的第二参数是传参，call的可以添加多个参数，apply只有两个参数且第二个参数必须是数组
 *  bind只有一个参数
 * 2、call和apply都是自执行函数
 *   bind不会立即执行，而是返回一个函数，需要执行这个函数
 * 
*/
test.call(obj)
test.apply(obj)
test.bind(obj)()

class Person {
    constructor(name, age) {
        console.log('constructor 里的this', this)
        this.name = name
        this.age = age
    }
    test1() {
        console.log('对象中方法的this', this)
    }
    asyncTest1() {
        setTimeout(function() {
            console.log('setTimeout 回调函数中的this',this)// window, 因为这个函数是异步的，实际执行是在全局执行的
        },0)
        setTimeout(() => {
            console.log('setTimeout 回调函数中的this',this)//  Person('张三', 20) 箭头函数中的this与他上一级的作用域是一样的
        },0)
    }
}

const zhangsan = new Person('张三', 20)
zhangsan.test1()
zhangsan.asyncTest1()

/**
 * 手写bind函数
 * 1、改变this指向
 * 2、第一参数是this的值后面的参数是函数接收的参数
 * 3、返回值不变
*/
function test2(a,b,c) {
    console.log(a,b,c)
    console.log('this', this)
    return 'kevinzzzzz'
}
Function.prototype.myBind = function() {
    const self = this // 保证返回值不变
    const args = Array.prototype.slice.call(arguments)
    const thisValue = args.shift()

    return function() {
        return self.apply(thisValue, args)
    }
}
const result = test2(1,10,100)
const boundTest2 = test2.myBind({name: 'kevinzzzzz'}, 6,66,666)

const boundResult = boundTest2()

console.log('result',result)
console.log('boundResult',boundResult)