## 什么是 nextTick？

    官方定义在下一次DOM更新循环结束之后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的DOM。

## 理解原理

    - Vue 在更新 DOM 时是异步执行的。相当于开启一个微任务（首选微任务队列，宏任务队列次之），一般用promise或者mutationObserver
    - 异步更新的好处是：可以避免不必要的计算和DOM操作，提高性能。
    - 只要侦听到数据变化，Vue 将开启一个异步更新队列，视图需要等待队列中所有数据变化完成后再统一进行更新。
    - 当响应式数据更新的时候，会利用dep.notify函数通知所有订阅者watcher，订阅者会调用update函数把自己放入一个队列中，然后通过nextTick方法将一个刷新watcher队列的方法flushSchedulerQueue放入到全局的callback数组中
    - flushSchedulerQueue函数负责刷新watcher队列，也就是执行所有watcher的run方法后进入更新阶段
