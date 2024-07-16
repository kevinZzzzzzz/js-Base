## Redux 的核心

redux 的设计思想是将状态（state）和状态修改逻辑（reducer）分离，通过中央存储（store）来管理应用程序中的状态（state），使得应用程序的状态更加可预测和可控。
redux 的核心概念是 action，reducer 和 store

- action：表示应用程序中的一个事件或者操作，是一个 js 对象，包含一个 type 属性和一些其他的数据。
- reducer：表示应用程序中的状态修改逻辑
