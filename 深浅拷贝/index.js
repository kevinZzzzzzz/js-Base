const oldObj = {
    name: 'kevinZzzzzz',
    age: 26,
    colors: ['orange', 'green', 'blue'],
    friend: {
        name: '啊哈哈哈啊哈'
    }
}
// const newObj = oldObj
// newObj.name = '小野'
// console.log('oldObj', oldObj)
// console.log('newObj', newObj)
 
//  手写深拷贝
function deepClone(obj = {}) {
    if (typeof obj !== 'object' || obj === null) return obj;
    let result;
    if (obj instanceof Array) {
        result = []
    } else {
        result = {}
    }
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = deepClone(obj[key])
        }
    }
    return result
}

const newObj1 = deepClone(oldObj)
newObj1.name = '小野'
newObj1.friend = {
    name: 'h'
}
// console.log('oldObj', oldObj)
// console.log('newObj1', newObj1)

/* 
    js基本数据类型：number string boolean undefined null 存储在栈内
        不是所有基本类型都存在栈中，当基本类型被闭包引用后，也可以长期在内存堆中。
    js引用数据类型：obj（array function）存储在堆内  变量内存地址存在栈内，不能直接访问堆内的数据 需要变量指针间接访问
*/

/* 
    深浅拷贝的原理
    深浅拷贝 都是创建一个新对象，在堆中创建一个新的内存
    浅拷贝：当拷贝的是引用数据类型，则只会拷贝数据在内存中地址，所以改变一个对象，相当于改变的是同个地址的变量，也会影响被拷贝对象
    深拷贝：是将一个对象从内存中完整拷贝出来，并在堆中中开辟一个新的内存地址给这个对象，改变其中一个对象，并不会影响到另一个对象
*/

/* 
    浅拷贝和赋值的区别
    赋值：将一个对象赋给另一个对象，赋的内容实际上是对象在栈的地址（指针），而不是数据本身，所以两个对象指向的是同一个存储空间
    浅拷贝：重新在堆中创建内存，拷贝的基本数据类型互不影响，拷贝的引用数据类型共享一个指针，所以会相互影响
    深拷贝：重新在堆中创建类型，将对象中的对象进行递归拷贝，拷贝前后互不影响
*/

//  拷贝
var per = {
    name: 'ahhah',
    hobby: ['hahah', [12,3,4,4], 2]
}
var per1 = per
per1.name = '123'
per.hobby = [123,32,3,2]
console.log(per)
console.log(per1)


// 浅拷贝
function shallowCopy(obj) {
    var target = {}
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            target[i] = obj[i]
        }
    }
    return target
}
var per2 = shallowCopy(per)
per.name = 232
per.hobby[0] = [1,1,1,1,1]
console.log(per2,123)
console.log(per)
console.log(per1)


/* 
    浅拷贝的实现
    1、Object.assign({}, obj)
    2、...展开运算符
    3、Array.prototype.concat()
    4、Array.prototype.slice()

    深拷贝
    1、JSON.parse(JSON.stringify())
    2、递归赋值实现
*/