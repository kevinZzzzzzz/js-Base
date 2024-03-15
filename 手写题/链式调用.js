/* 
  链式调用的实现方式
  通过在对象的方式中返回对象自身this来实现，可以使多个方法调用连续写在一起，形成链式调用
*/
class Calculator {
  constructor() {
    this.value = 0;
  }
  add(val) {
    this.value += val;
    return this
  }
  subtract(val) {
    this.value -= val;
    return this
  }
  multiply(val) {
    this.value *= val;
    return this
  }
  divide(val) {
    this.value /= val;
    return this
  }
  getValue() {
    return this.value;
  }
}
const calculator = new Calculator();
const result = calculator.add(1).subtract(2).multiply(3).divide(4).getValue();

console.log(result)