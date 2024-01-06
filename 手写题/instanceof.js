/**
 * instanceof 只能检测对象
 *  instanceof 作类型判断 ===> 实例 instanceof 类
 * 原理： 实例.__proto__ === 类.prototype
 * 原理描述：在原型链上一层一层查找，找类constructor.prototype 是否存在于实例的原型链上。
 * */
 const object = {} 
 const array = []
 console.log('result object(object)', typeof object)
 console.log('result object(array)', typeof array)
 
 const flagObject = object instanceof Array
 const flagArray = array instanceof Array
 console.log('result object(instanceof)', object.__proto__, Array.prototype)
 console.log('result object(instanceof)', array.__proto__, array.__proto__ === Array.prototype)
 
/* 
  手写instanceof
  params: 实例 example
          类 classFun
*/
function _instanceof(example, classFun) {
  // 检测的类型必须为对象Object
  if (typeof example !== 'object' || example === null) return false
  let proto = Object.getPrototypeOf(example) // 先取的当前实例对象的原型链 即example.__proto__
  while(true) {
    if (proto === null) return false
    if (proto === classFun.prototype) return true // 当前实例对象的原型链上找到类，则返回true ，没有的话往原型的原型继续找
    // 沿着原型__proto__一层一层往上找
    proto = Object.getPrototypeOf(proto)
  }
}

