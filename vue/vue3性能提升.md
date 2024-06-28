## Vue3.0 性能提升主要是体现在哪些方面

### 1. 响应式系统升级

- Vue2 的核心是 Object.defineProperty, 劫持整改对象，然后递归深度遍历所有属性，为每个属性添加 getter 和 setter。
- Vue3 的核心是 Proxy，直接劫持整个对象，并通过 Reflect 操作对象内部属性，不再需要遍历递归。
  - 可以监听动态新增、删除的属性
  - 可以监听数组的索引和 length 属性
  - 实现原理
    1. 利用 Proxy, 包装整个对象，拦截对象中任意属性的变化，包括属性值的读写、属性的添加和删除等
    2. 利用 Reflect, 保证 Proxy 的所有操作都对应有 Reflect 方法，且 Reflect 方法的返回值就是 Proxy 方法返回值
    3. 利用 ES6 的 Proxy 和 Reflect, 实现一个数据监听和响应式原理

#### 为什么 Proxy 一定要配合 Reflect 使用？

- Proxy 代理，它内置了一系列“劫持方法”用于创建一个对象的代理，从而实现基本操作的拦截和自定义行为（如属性查找、赋值、枚举、函数调用等）。
- 单独使用 proxy 在某些情况下会有局限性，特别是在尝试模仿默认行为时。
- Reflect 反射，它提供拦截 JavaScript 操作的方法。这些方法与 Proxy 的方法相同。
- Reflect 是一个内置对象，提供了一组与 JavaScript 运行操作对应的方法，这些方法使得在编写代理处理程序时，可以轻松调用对象的默认行为。

Proxy 的局限性
JavaScript 中的 Proxy 提供了一种强大且灵活的方式来拦截并定义对象的基本操作的自定义行为。然而，单独使用 Proxy 在某些情况下可能会遇到一些局限性，特别是在尝试模仿默认行为时。
例如，如果我们想要在拦截属性的读取操作时，仍然返回属性的默认值，我们就需要在处理程序中实现这一点：
```
  const target = { name: '小明', age: 18 };

  const handler = {
    get(target, prop, receiver) {
      if (prop in target) {
        return target[prop]; // 手动模仿默认的 get 行为
      }
      return undefined; // 如果属性不存在，返回 undefined
    },
    set(target, prop, value, receiver) {
      if (prop === 'age' && typeof value !== 'number') {
        throw new TypeError('Age must be a number');
      }
      // 手动实现默认行为
      target[prop] = value;
      return true;
    }
  };

  const proxy = new Proxy(target, handler);
  console.log(proxy.name); // 输出：小明
```

这种方式虽然可行，但不够优雅，因为它要求开发者手动实现语言的默认行为，并且容易出错。
Reflect 的优势
通过使用 Reflect，我们可以更优雅地实现上述行为：
```
  const target = { name: '小明', age: 18 };
  const handler = {
    get(target, prop, receiver) {
      // 使用 Reflect 模仿默认的 get 行为，如果属性不存在，返回 undefined
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      // 使用 Reflect.set() 调用默认行为，成功返回 true
      return Reflect.set(target, prop, value, receiver);
    }
  };

  const proxy = new Proxy(target, handler);
  console.log(proxy.name); // 输出：小明
```

这样代码更简洁，行为也更一致。
  Reflect 的必要性

  - 默认行为的一致性：Reflect 对象提供了与大多数 Proxy traps 对应的方法，使得在进行对象操作时，可以保持一致的编程模式，且代码的可读性和可维护性更强。
  - 更好的错误处理：Reflect 方法返回一个布尔值，可以清晰地指示操作是否成功，这使得错误处理更加直观。
  - 函数式编程风格：Reflect 方法接受目标对象作为第一个参数，这允许你以函数式编程风格处理对象操作。
  - 接收者（receiver）参数：Reflect 方法通常接受一个接收者参数，这允许你在调用方法时明确指定 this 的值，这在实现基于原型的继承和自定义 this 绑定时非常有用。

- 简单来说，我们可以通过 Proxy 创建对于原始对象的代理对象，从而在代理对象中使用 Reflect 达到对于 JavaScript 原始操作的拦截
- 总结：触发代理对象的劫持时保证正确的 this 上下文指向。
  - Proxy 中接受的 Receiver 形参表示代理对象本身或者继承与代理对象的对象。
  - Reflect 中的 Receiver 形参表示目标对象本身。

### 2. 编译优化

<!-- - Vue2的模板是使用正则表达式解析的，性能损耗较大。
- Vue3的模板是使用AST（抽象语法树）来描述模板的，然后通过编译器将AST转换成render函数，render函数再通过with语法和虚拟DOM实现渲染。
  - 模板中的所有信息都被抽象成了AST，这样在编译过程中，只需要对AST进行处理，即可得到最终的render函数。 -->

- Vue.js 2.x 通过标记静态节点，优化 diff 的过程
- Vue.js 3.x
  - vue.js 3.x 中标记并提升所有的静态节点，diff 的时候只需要对比动态节点内容；
  - Fragments（升级 vetur 插件): template 中不需要唯一根节点，可以直接放文本或者同级标签
  - 静态提升(hoistStatic)，当使用 hoistStatic 时，所有静态的节点都被提升到 render 方法之外.只会在应用启动的时候被创建一次,之后使用只需要应用提取的静态节点，随着每次的渲染被不停的复用。
  - patch flag, 在动态标签末尾加上相应的标记,只能带 patchFlag 的节点才被认为是动态的元素,会被追踪属性的修改,能快速的找到动态节点,而不用逐个逐层遍历，提高了虚拟 dom diff 的性能。
  - 缓存事件处理函数 cacheHandler，避免每次触发都要重新生成全新的 function 去更新之前的函数

### 3. 源码体积的优化

- 相比 Vue2，Vue3 整体体积变小了
- Tree-shaking
  - Tree-shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES6 模块系统中的静态结构特性，例如 import 和 export。这个术语和概念实际上是由 ES6 模块打包工具 Rollup 普及开的。

## 生命周期

Vue 实例有⼀个完整的⽣命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载 等⼀系列过程，称这是 Vue 的⽣命周期。
1、beforeCreate（创建前） ：数据观测和初始化事件还未开始，此时 data 的响应式追踪、event/watcher 都还没有被设置，也就是说不能访问到 data、computed、watch、methods 上的方法和数据。
2、created（创建后） ：实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，但是此时渲染得节点还未挂载到 DOM，所以不能访问到 `$el` 属性。
3、beforeMount（挂载前） ：在挂载开始之前被调用，相关的 render 函数首次被调用。实例已完成以下的配置：编译模板，把 data 里面的数据和模板生成 html。此时还没有挂载 html 到页面上。
4、mounted（挂载后） ：在 el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的 html 内容替换 el 属性指向的 DOM 对象。完成模板中的 html 渲染到 html 页面中。此过程中进行 ajax 交互。
5、beforeUpdate（更新前） ：响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的真实 DOM 还没有被渲染。
6、updated（更新后）：在由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。调用时，组件 DOM 已经更新，所以可以执行依赖于 DOM 的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
7、beforeDestroy（销毁前） ：实例销毁之前调用。这一步，实例仍然完全可用，`this` 仍能获取到实例。
8、destroyed（销毁后） ：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务端渲染期间不被调用。
