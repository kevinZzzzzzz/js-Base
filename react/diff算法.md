## react diff 算法

### react 同一节点的比较

> 在 React 中，diff 算法会优先比较节点类型是否相同。
>
> ```
> 例如：
> <> div>
>   <Counter />
> </>
>
> <span>
>   <Counter />
> </span>
> div 与 span 属于不同的节点类型，那么就表示不是同一个节点。
> ```
>
> 然后会比较 props、state、context 等外部传入的参数是否相同，从而判断是否是同一个节点。（涉及性能问题 - React.memo）
> 跟 vue 相同的策略
> 1、同层比较
> 如果相同：则直接复用，而不需要重新创建
> 如果不同：则直接默认为从该节点开始，以下的全部节点都发生了变化，需要重新创建。

### 基于 fiber 架构的 diff 算法

- 与 vue diff 算法区别：vue 是双指针策略，因为 diff 对象是两个数组；react diff 的对象是一个数组和一个 fiber 解构(react 不采用双指针的原因)
- 对比的对象是根据新的 jsx 数据类型 diff 出需要变动的旧的 fiber，并且变动的部分打上标记，生成新的 fiber 结构
- react 采用右移策略，对于需要变动的节点，始终都将其往最右侧移动。
  react diff 算法的过程

- 将 new 新节点数组的第一个节点拿到 old 旧的 fiber 链表里面的第一个节点比较，相同旧复用， 不同就跳出循环下一步
- 对旧节点生成一个节点与下标的 map 表, 新节点每一项对应旧节点的 map 表（不存在就-1），并记录 lastIndex 为 0

```
eg:
{
  A : 0,
  B : 1,
  C : 2,
  D : 3
}
```

- 遍历 new 的每一个节点，当前节点的索引和 lastIndex 比较
- 如果大于 lastIndex 则不动，并将当前的节点下标赋值给 lastIndex
- 如果小于 lastIndex，则将当前节点移动到最右侧的第一个未打标签的元素之前

eg

```
  old [A , B , C , D]
  new [B , D , A , C]
  第一步：
    A 和 B 比较，不同，跳出循环
  第二步：生成map表；
  {
    A : 0,
    B : 1,
    C : 2,
    D : 3
  }
    old [A , B , C , D]
        0   1   2   3
    new [B , D , A , C]
        1   3   0   2

此时lastIndex = 0;以下简称l
遍历new
B(1) > l(0)  所以不移动； 并将 l 赋值为 1
D(3) > l(1)  所以不移动； 并将 l 赋值为 3
A(0) < l(3)  记录一下 将A移动到最右侧
C(2) < l(3)  记录一下 将C移动到最右侧
结束diff，生成的待操作表是 1 将A移动到最右侧 2 将C移动到最右侧
```

![](./Snipaste_2024-08-02_18-38-08.png)
![](./Snipaste_2024-08-02_18-38-42.png)
![](./Snipaste_2024-08-02_18-40-12.png)

### 案例

#### 最右原则

新旧列表节点如下

```

旧列表：[A] [B] [C] [D]
新列表：[B] [A] [D] [C]
新的数据为 [B, A, D, C]
```

1、第一个目标节点为 B，发现在旧列表中存在相同 key，那么复用节点，此时，index = 1，当前结果为

```
index = 1
lastIndex = 0
index < lastIndex // false，不移动
lastIndex = max(index, lastIndex) // 1

[B]
```

2、第二个目标节点为 A，发现在旧列表中存在相同 key，那么复用节点，此时，index = 0，当前结果为

```
index = 0
lastIndex = 1
index < lastIndex // true，移动

lastIndex = max(index, lastIndex) // 1
[B] [A]
```

3、第三个目标节点为 D，发现在旧列表中存在相同 key，那么复用节点，此时，index = 3，当前结果为

```
index = 3
lastIndex = 1
index < lastIndex // false，不移动

lastIndex = max(index, lastIndex) // 3

[B] [A] [D]
```

4、第四个目标节点为 C，发现在旧列表中存在相同 key，那么复用节点，此时，index = 2，当前结果为

```
index = 2
lastIndex = 3
index < lastIndex // true，移动

lastIndex = max(index, lastIndex) // 3

[B] [A] [D] [C]
```

这个案例在 diff 之后，只需要真实 DOM 移动两次节点。就可以完成更新了。

相信通过这两个案例，大家应该能掌握 React 在列表中的对比规则，接下来，我们来了解一下 Vue 的双端对比。
