### v-for 和 v-if不能一起用？
答： 涉及到优先级问题，v-for会比v-if优先执行
```
<div v-for="(item, idx) in array" :key="idx" v-if="boolean"></div>
如果v-if和v-for同一级的话会始终先循环v-for，然后在每个item上加上v-if。这样每个子项都要做一个v-if判断，会造成性能浪费（不会报错，会警告）

解决方法：可以把v-if提到外层去,(可以用template替换div)
<div v-if="boolean">
    <div v-for="(item, idx) in array" :key="idx"></div>
</div>
```

### vue2中数组变化的限制&解决方法
答：vue2检测不了数组的索引和数组长度的变化，原因是Object.defineProperty()的方法对数组劫持的实现不太理想，或者无法对数组进行劫持，这个问题在vue3中已经解决，vue2的解决方法是对数组的方法进行重写
解决方法：$set,$detele,以及数组的方法splice。

### 为什么data必须是一个函数？
这个函数会return一个全新的对象，来保存当前组件实例维护一份单独的数据

### v-if和v-show的区别
v-if只有在条件为true的时候才会去渲染元素，而v-show是在直接在不满足条件的元素上增加一个style："display: none"的内敛样式
如果需要频繁切换条件展示元素的话用v-show  如果是元素的显示和隐藏是一次性决定的那就用v-if

### $nextTick
vue 渲染跟新是异步的，用nextTick可以在dom异步渲染结束之后获取改变之后的数据