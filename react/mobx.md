# MobX

 一个响应式状态管理库。Mobx5之前响应式原理是Object.defineProperty。Mobx5开始使用proxy。
 相较于Redux，Mobx只强调下面三个概念
 - State 状态 定义State并使其可观察
 - Actions 动作 使用Action更新State
 - Derivations 派生 创建Derivations以便自动对State变化进行响应
简述：
在任何事件中强调action，修改state，如果这个state是响应式的，那么会通知基于这个state派生的计算值，或者触发派生的副作用。
其中派生属性可以分为两种情况
计算值computeds：基于state计算出来的值，并且这个值是响应式的，如果state改变，那么这个值会自动更新。类似useMemo、computed
副作用effects：当state改变时，会自动触发这个副作用，比如打印日志，发送网络请求等。类似useEffect和watchEffect
## 安装

```bash
npm install mobx mobx-react-lite
```
