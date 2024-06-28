## new vue()发生了什么事情？
答：Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染函数render，初始化 data、props、computed、watcher 等等。  

## computed的原理
答：computed本身是一个惰性的观察者，当vue初次运行会对computed属性做初始化处理，即对每个计算属性创建一个Watcher对象，并传入一个函数，该函数的本质其实就是computed配置中的getter函数，getter函数运行过程就会收集依赖。
和渲染函数不同的是，计算属性创建的Watcher不会立即执行，因为要考虑计算属性是否会被渲染函数使用到。
在创建Watcher的时候，会使用到lazy配置，可以控制Watcher执不执行。
Watcher内部会保存两个关键属性来实现缓存：value和dirty。
  受到lazy的影响，value最开始是undefined
  如果dirty为true，计算属性会触发getter重新计算
  如果为false，计算属性会返回value
在依赖收集过程中，计算属性依赖的数据不仅会收集到计算属性的Watcher中，也会收集到组件的Watcher
当计算属性的依赖发生变化时，它只需设置dirty为true。此时由于依赖同时会收集到组件的Watcher中，因此整个组件都会重新渲染，由于之前已经将dirty设置为true，因此计算属性会重新计算，并返回计算属性的值。
