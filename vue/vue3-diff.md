# 【源码系列#06】Vue3 Diff算法🌸
## 前后元素不一致
- 两个不同虚拟节点不需要进行比较，直接移除老的节点，然后将新的节点渲染成真实的dom挂载到页面上

## 前后元素一致
- 两个相同的虚拟节点，先复用节点，再比较两个节点的属性和子节点
  - 能复用就复用
  - 然后再新增或者删除
- 判断是否是相同的虚拟节点？
  - 判断节点的key是否相同
  - 判断节点的type是否相同

## 核心Diff算法
  前序比对、后序比对、同序列加挂载、同序列加卸载的目的都是：尽可能减少后面乱序比对的元素 在正式介绍diff算法之前，我们先了解几个问题

  如何判断是否是相同的虚拟节点？
  答：虚拟节点的 type类型相同 && key相同 即可

  c1、c2 指的是什么？
  答：patch对比元素打补丁，先复用节点、再比较属性、最后比较儿子节点。c1指的是旧的儿子节点；c2指的是新的儿子节点

  e1、e2 指的是什么？
  答：尾指针，初始值分别指向新旧孩子的最后一个节点，e1 = c1.length - 1 ；e2 = c2.length - 1

  - sync from start 前序对比
    从头部开始正序比对
    如果是相同的虚拟节点，则调用patch对比元素打补丁（先复用节点、再比较属性、再递归比较子节点），i+1
    终止条件：新旧虚拟节点不一致，或， 双方有一方 i 大于 尾指针，停止循环(i > e1 && i > e2)
    
  - sync from end 后序对比
  - common sequence+mount 同序列加挂载
    分为 头部挂载 和 尾部挂载 两种场景
    i 比 e1 大说明有要新增的，i 和 e2 之间的是新增的节点
    ```
      // common sequence + mount 同序列加挂载
      // i要比e1大说明有新增的；i和e2之间的是新增的部分
      // (a b c)
      // (a b c) d e
      //     (a b c)
      // e d (a b c)
      if (i > e1) {
        if (i <= e2) {
          while (i <= e2) {
            const nextPos = e2 + 1
            // 根据下一个人的索引来看参照物
            const anchor = nextPos < c2.length ? c2[nextPos].el : null
            patch(null, c2[i], container, anchor) // 创建新节点 扔到容器中
            i++
          }
        }
      }

    ```
  - common sequence+unmount 同序列加卸载
    分为 头部卸载 和 尾部卸载 两种场景
    i 比 e2 大说明有要卸载的，i 到 e1 之间的就是要卸载的节点
    ```
      // common sequence + unmount 同序列加卸载
      // i比e2大说明有要卸载的；i到e1之间的就是要卸载的
      // (a b c) d e
      // (a b c)
      // e d (a b c)
      //     (a b c)
      else if (i > e2) {
        if (i <= e1) {
          while (i <= e1) {
            unmount(c1[i])
            i++
          }
        }
      }
    ```
  - unknown sequence 乱序对比