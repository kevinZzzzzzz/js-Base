// @ts-nocheck
export function reactive(target: any) {
  // proxy的get track
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key)
      return target[key]
    },
    // proxy的set trigger
    set(target, key, value, receiver) {
      target[key] = value
      trigger(target, key)
      return true
    }
  })
}
// 全局变量，targetMap 记录 {obj: { name: [effect1] },obj2:... }
const targetMap = new WeakMap()
// effect运行的时候，将自己赋值给activeEffect，这样方便运行函数获取属性的时候，通过这个变量收集effect
let activeEffect = null

// track 说白了  收集effect1 {obj: { name: [effect1] },obj2:... }
function track(target: any, key: string) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  const shouldTrack = !dep.has(activeEffect)
  // 这句是核心，上面就是判断各种有没有
  shouldTrack && dep.add(activeEffect)
  console.log(targetMap)
}
// trigger 让effect1执行 {obj: { name: [effect1] },obj2:... }
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (!dep) return
  console.log(dep)
  dep.forEach(effect => effect.run())
}
export function effect(fn) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
  return _effect
}

// ReactiveEffect创建effect示例的，核心方法就是effect
class ReactiveEffect {
  constructor(public fn) {
    this._effect = this
  }
  run() {
    activeEffect = this
    return this.fn()
  }
}
