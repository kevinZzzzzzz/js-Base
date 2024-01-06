/* 
数组扁平化处理：将一个多维数组 转话称一个一维数组
-flat() 参数是数字，表示解开多少维 最大Infinity
-正则表达是 将‘['和']‘ 转成 ’,'
-递归
-reduce
*/
let arr = [1, [2,3,[4,5,6,[7,8]]]]
let arr1 = arr.flat(Infinity)
console.log(arr, arr1)


let arr2 = JSON.parse('[' +JSON.stringify(arr).replace(/\[|\]/g, '') + ']')
console.log(arr2)

let arr3 = []
const toArr = ar =>  {
    for(let i in ar) {
        if (ar[i] instanceof Array) {
            toArr(ar[i])
        } else {
            arr3.push(ar[i])
        }
    }
}
toArr(arr)
console.log(arr3)

const flatten = arr => {
    return arr.reduce(
        (pre, cur) => {
            return pre.concat(cur instanceof Array ? flatten(cur) : cur)
        },[]
    )
}
console.log(flatten(arr))

/* 
    数组: Array判断
 */
let a = []
// 1、基于instanceof
a instanceof Array;
// 2、基于constructor
a.constructor === Array;
// 3、基于Object.prototype.isPrototypeOf
Array.prototype.isPrototypeOf(a);
// 4、基于getPrototypeOf
Object.getPrototypeOf(a) === Array.prototype;
// 5、基于Object.prototype.toStrinf
Object.prototype.toString.call(a) === '[object Array]';
// 6、基于es6的Array.isArray()
Array.isArray(a)

/* 
    数组改变自身的方法
    pop、push、reverse、shift、sort、splice、unshift
    以及两个 ES6 新增的方法 copyWithin 和 fill
 */

/* 
    不改变自身的方法
    concat、join、slice、toString、toLocaleString、indexOf、lastIndexOf、未形成标准的 toSource，以及 ES7 新增的方法 includes
*/
/* 
    数组遍历的方法
    forEach、every、some、filter、map、reduce、reduceRight，以及 ES6 新增的方法 entries、find、findIndex、keys、values
*/


/* 
    类数组
    arguments对象
*/