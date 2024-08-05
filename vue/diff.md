## vue diff算法
### vue 同一节点的比较
vue 中会通过 sameVnode 方法来比较节点是否相同

```
// 主要通过对key和标签名做比较
function sameVnode (a, b) {
  return (
    a.key === b.key && // 标签名是否一样
    a.asyncFactory === b.asyncFactory && ( // 是否都是异步工厂方法
      (
        a.tag === b.tag && // 标签名是否一样
        a.isComment === b.isComment && // 是否都为注释节点
        isDef(a.data) === isDef(b.data) && // 是否都定义了data
        sameInputType(a, b)  // 当标签为input时，type必须是否相同
      ) || (
        isTrue(a.isAsyncPlaceholder) && // 是否都有异步占位符节点
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
```

### 为什么不要用index来作为key值
- index作为key值会导致diff算法的性能下降
- 当对列表做新增或者删除的操作时，用index会使整个列表重新渲染
> 在引入了 key 值之后，为了追求在某些情况下更少的移动次数，Vue 中使用了更复杂的算法设计：双端比较以及最长子序列递增，这是他们最大的区别。


## 双端比较
> Vue 的双端对比的设计有一个目标，那就是在特定的场景之下，**减少真实 DOM 的移动次数**。

```
旧：[A] [B] [C] [D]
新：[D] [A] [B] [C]
```
如果按照 React 的比较规则，此时由于第一个目标 D 的 index 为 3，从一开始就变成了最大，因此，后续的 lastIndex 都为 3，所有的目标项都会满足 index < lastIndex，因此，真实 DOM 的移动就会执行 3 次。
而 Vue 提出的双端比较，目标就是希望可以识别出来这种情况，只需要让移动只发生一次即可。就是 D 从最末尾移动到最前面。

#### 双端比较会使用 4 个指针，分别记录旧列表和新列表的首尾两个节点位置。
```
let oldStartIdx = 0
let oldEndIdx = prevChildren.length - 1
let newStartIdx = 0
let newEndIdx = nextChildren.length - 1
```
比较的规则遵循：首-首比较，尾-尾比较，尾-首比较，首-尾比较的顺序。通过这样方式找出首尾是否有节点可以被复用。