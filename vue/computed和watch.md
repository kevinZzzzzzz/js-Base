## vue3 的 computed 和 watch 源码解析

```
  function computed(getter) {
    let value;
    let dirty = true;
    const effect = new ReactiveEffect(getter, () => {
      dirty = true;
    });

    const obj = {
      get value() {
        if (dirty) {
          value = effect.run();
          dirty = false;
        }
        return value;
      }
    };

    return obj;
  }

```

ReactiveEffect 是 Vue 3 响应式系统里的副作用函数，它会追踪依赖并在依赖变化时触发回调。
dirty 是一个标记，用来判断是否需要重新计算 computed 的值。
get value() 是一个 getter 方法，当访问 computed 的 value 属性时，若 dirty 为 true，就会重新计算值并把 dirty 设为 false。

```
  function watch(source, cb) {
    let oldValue;
    const getter = isFunction(source) ? source : () => traverse(source);

    const effect = new ReactiveEffect(getter, () => {
      const newValue = effect.run();
      cb(newValue, oldValue);
      oldValue = newValue;
    });

    oldValue = effect.run();
  }

  function traverse(value) {
    if (typeof value !== 'object' || value === null) {
      return value;
    }
    for (const key in value) {
      traverse(value[key]);
    }
    return value;
  }

```

source 可以是一个响应式对象或者一个返回值的函数。
getter 函数用来获取 source 的值。
ReactiveEffect 会追踪 source 的依赖，当依赖变化时，会执行回调函数 cb。
traverse 函数用于递归遍历响应式对象，从而触发对象属性的 getter，让 ReactiveEffect 能够追踪到所有依赖。

ReactiveEffect

```
// 用于存储当前正在执行的副作用函数
let activeEffect = null;

class ReactiveEffect {
  // 构造函数，接收副作用函数和调度器函数
  constructor(fn, scheduler) {
    this.fn = fn; // 副作用函数
    this.scheduler = scheduler; // 调度器函数，可选
    this.deps = []; // 存储该副作用函数依赖的所有依赖项
  }

  // 运行副作用函数
  run() {
    try {
      // 将当前副作用函数设置为活动状态
      activeEffect = this;
      // 执行副作用函数并返回结果
      return this.fn();
    } finally {
      // 执行完毕后，将活动副作用函数置为 null
      activeEffect = null;
    }
  }

  // 停止追踪依赖
  stop() {
    // 遍历所有依赖项，从依赖项的依赖列表中移除当前副作用函数
    for (let i = 0; i < this.deps.length; i++) {
      this.deps[i].delete(this);
    }
    // 清空依赖列表
    this.deps.length = 0;
  }
}

// 用于追踪依赖
function track(target, key) {
  if (activeEffect) {
    // 获取目标对象的依赖映射
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      // 如果不存在，则创建一个新的依赖映射
      targetMap.set(target, (depsMap = new Map()));
    }
    // 获取目标对象指定键的依赖集合
    let dep = depsMap.get(key);
    if (!dep) {
      // 如果不存在，则创建一个新的依赖集合
      depsMap.set(key, (dep = new Set()));
    }
    // 将当前活动的副作用函数添加到依赖集合中
    dep.add(activeEffect);
    // 将依赖集合添加到副作用函数的依赖列表中
    activeEffect.deps.push(dep);
  }
}

// 用于触发依赖更新
function trigger(target, key) {
  // 获取目标对象的依赖映射
  const depsMap = targetMap.get(target);
  if (depsMap) {
    // 获取目标对象指定键的依赖集合
    const dep = depsMap.get(key);
    if (dep) {
      // 遍历依赖集合
      dep.forEach(effect => {
        if (effect.scheduler) {
          // 如果有调度器函数，则调用调度器函数
          effect.scheduler();
        } else {
          // 否则直接运行副作用函数
          effect.run();
        }
      });
    }
  }
}

// 全局的目标对象映射，用于存储所有目标对象的依赖信息
const targetMap = new WeakMap();


```

ReactiveEffect 类：

constructor：接收副作用函数 fn 和可选的调度器函数 scheduler，并初始化 deps 数组用于存储依赖项。
run：将当前副作用函数设置为活动状态，执行副作用函数，并在执行完毕后将活动副作用函数置为 null。
stop：停止追踪依赖，从所有依赖项的依赖列表中移除当前副作用函数，并清空 deps 数组。
track 函数：

用于追踪依赖，当有活动的副作用函数时，将其添加到目标对象指定键的依赖集合中，并将依赖集合添加到副作用函数的依赖列表中。
trigger 函数：

用于触发依赖更新，当目标对象的指定键发生变化时，遍历其依赖集合，根据是否有调度器函数来决定是调用调度器函数还是直接运行副作用函数。
targetMap：

全局的 WeakMap，用于存储所有目标对象的依赖信息。
