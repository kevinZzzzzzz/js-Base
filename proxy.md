## proxy代理
new Proxy(target, handler)表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为,类似于Object.defineProperty,也有get()、set()。

## Proxy的作用
### 对于代理模式 Proxy 的作用主要体现在三个方面
- 拦截和监视外部对对象的访问
- 降低函数或类的复杂度
- 在复杂操作前对操作进行校验或对所需资源进行管理
### Proxy所能代理的范围--handler
实际上 handler 本身就是ES6所新设计的一个对象.它的作用就是用来 自定义代理对象的各种可代理操作 。它本身一共有13中方法,每种方法都可以代理一种操作.其13种方法如下
- handler.getPrototypeOf() 在读取代理对象的原型时触发该操作，比如在执行 Object.getPrototypeOf(proxy) 时。

- handler.setPrototypeOf() 在设置代理对象的原型时触发该操作，比如在执行 Object.setPrototypeOf(proxy, null) 时。

- handler.isExtensible() 在判断一个代理对象是否是可扩展时触发该操作，比如在执行 Object.isExtensible(proxy) 时。

- handler.preventExtensions() 在让一个代理对象不可扩展时触发该操作，比如在执行 Object.preventExtensions(proxy) 时。

- handler.getOwnPropertyDescriptor() 在获取代理对象某个属性的属性描述时触发该操作，比如在执行 Object.getOwnPropertyDescriptor(proxy, "foo") 时。

- handler.defineProperty() 在定义代理对象某个属性时的属性描述时触发该操作，比如在执行 Object.defineProperty(proxy, "foo", {}) 时。

- handler.has() 在判断代理对象是否拥有某个属性时触发该操作，比如在执行 "foo" in proxy 时。

- handler.get() 在读取代理对象的某个属性时触发该操作，比如在执行 proxy.foo 时。

- handler.set() 在给代理对象的某个属性赋值时触发该操作，比如在执行 proxy.foo = 1 时。

- handler.deleteProperty() 在删除代理对象的某个属性时触发该操作，比如在执行 delete proxy.foo 时。

- handler.ownKeys() 在获取代理对象的所有属性键时触发该操作，比如在执行 Object.getOwnPropertyNames(proxy) 时。

- handler.apply() 在调用一个目标对象为函数的代理对象时触发该操作，比如在执行 proxy() 时。

- handler.construct() 在给一个目标对象为构造函数的代理对象构造实例时触发该操作，比如在执行new proxy() 时。