// 闭包：一个函数和它定义的周围环境引用捆绑在一起的组合

// 函数作为返回值  保护私有变量
function test() {
    const a = 1;
    return function() {
        console.log('a',a)
    }
}
const fn = test()
const a = 2
fn()

// 实现数据封装
function createPerson(name) {
    let age = 0
    return {
        getName: function() {
            return name
        },
        getAge: function() {
            return age
        },
        setAge: function(value) {
           if ( value >= 0) {
                age = value
           }
        }
    }
}

// 函数作为参数传入  作为回调函数可以访问外部函数的局部变量
function test1(fn) {
    const a1 = 1
    fn()
}
const a1 = 2
function fn1() {
    console.log('a1', a1)
}

test1(fn1)

// 先看是变量是传参还是自由变量
function test2(fn) {
    const a2 = 1
    fn(a2)
}
const a2 = 2
function fn2(a2) {
    console.log('a2', a2)
}

test2(fn2)  