## Suspense 的实现原理

### 初步原理

promise 没有加载完成前，Suspense Fiber 下面创建的是 fallback Fiber，也就是这个 loading
组件加载完成，suspense fiber 的子节点去挂载真正的组件，也就是这个 Lazy 组件

### 更细节的原理

可以看到在 render 阶段，react 会执行一个循环，不断的执行 beginWork，一个一个的创建 fiber 节点

如上图 beginWork 创建 App Fiber，然后 Suspense Fiber，然后 Lazy Fiber，然后 div Fiber

```
js 代码解读复制代码
do {
  try {
    while (workInProgress) {
      const next = beginWork(workInProgress)
      workInProgress = next
    }
    break
  } catch (thrownValue) {
    handleError(root, thrownValue)
  }
} while (true)
```

1、beginWork 创建到 Lazy Fiber 的时候，只要组件未加载完成，也就是这个 React.lazy 这个 promise 还在 pending, promise 就会被当做错误 throw 抛出

2、错误被上面的 handleError 捕获到，他会

- 找到最近的父亲 Suspense Fiber
- 给 Suspense Fiber 标记 DidCapture Flag
- 把 React.lazy 的 promise 保存在 suspense Fiber 的 updateQueue
- 把 workInProgress 又指向 Suspense Fiber

3、处理完错误，这时候又开始 beginWork 工作循环。经过刚才的错误，workInProgress 从 Lazy Fiber 变成了他的父亲 Suspense Fiber
也就是说我们的 beginWork 现在是第二次处理 Suspense ，这时候发现刚才标记的 DidCapture Flag，他就会先创建一个 fallback Fiber
