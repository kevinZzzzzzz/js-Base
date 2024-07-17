## Redux 的核心

单向数据流框架
redux 的设计思想是将状态（state）和状态修改逻辑（reducer）分离，通过中央存储（store）来管理应用程序中的状态（state），使得应用程序的状态更加可预测和可控。
redux 的核心概念是 action，reducer 和 store

- action：表示应用程序中的一个事件或者操作，是一个 js 对象，包含一个 type 属性和一些其他的数据。
  当触发某个事件时，会同 dispatch 触发一个 action，派发一个通知 Redux 中的状态需要改变

- reducer：表示应用程序中的状态修改逻辑，纯函数，接收当前状态 state 和 action 对象作为参数，返回一个新的状态 state。

- store：表示应用程序中的状态存储，js 对象，包含应用程序的当前状态 state 和一些操作状态的方法

Redux 的工作流程

- 应用程序中的某个事件触发一个 action
- Redux 的 store 接收到 action，调用对应的 reducer 来修改应用程序的状态
- 修改后的状态被存储在 Redux 中 store 中，所有订阅 store 的组件都会收到通知并更新
