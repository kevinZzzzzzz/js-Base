// this 的值是在函数执行是决定的，不是在函数定义时决定的

function test() {
    console.log('this', this)
}
test()
let obj = {
    name: 'kevinzzzzz'
}


/* 
    箭头函数中的this
    1、箭头函数中this指向是固定化，并不是也因为箭头函数内部有绑定this机制，实际是箭头函数根本就没有自己的this，导致内部的this是外层代码块的this
    2、构造函数不能用this
*/
var x = 11
var obj1 = {
    x: 22,
    say: () => {
        console.log(this.x) // this所处的环境是obj1，obj1外的环境是window
    }
}
obj1.say()

var obj2 = {
    birth: 1996,
    getAge: function() {
        var b = this.birth
        var fn = () => {
           return new Date().getFullYear() - this.birth // this所处的环境是getAge，外层是obj2
        }
        return fn()
    }
}
console.log(obj2.getAge())