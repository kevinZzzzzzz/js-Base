import Hooks from "./Hooks.js"
export default class Calculator {
  constructor(option = {}) {
    this.hooks = new Hooks()
    const {initialValue = 0, plugins = []} = option
    this.currentValue = initialValue
    // 通过plugin执行apply来注册插件 -- apply执行后会绑定（插件内的）处理函数到生命周期
    plugins?.forEach(plugin => plugin.apply(this.hooks));
  }
  getCurrentValue() {
    return this.currentValue
  }
  setValue(value) {
    const result = this.hooks.trigger('valueWillChanged', value)
    if (!result) return false
    this.currentValue = value
    this.hooks.trigger('valueChanged', this.currentValue)
  }
  plus(addend) {
    this.hooks.trigger('pressedPlus', this.currentValue, addend)
    this.setValue(this.currentValue + addend)
  }
  minus(subtrahend) {
    this.hooks.trigger('pressedMinus', this.currentValue, subtrahend)
    this.setValue(this.currentValue - subtrahend)
  }
}