## Vuex 核心思想

> 当组件需要修改状态时，会触发一个 Action，Action 会通过 commit 发送一个 Mutation，Mutation 会改变 State。State 的改变会触发组件的重新渲染。

> Vuex 的核心思想是集中式管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

> Vuex 的核心概念包括：
> State：存储应用的状态，是组件之间共享的数据源。
> Getters：从 State 中派生出一些状态，类似于计算属性。
> Mutations：唯一允许更新 State 的方法，必须是同步函数。
> Actions：用于提交 Mutations，可以包含异步操作。
> Modules：将 Store 分割成模块，每个模块拥有自己的 State、Mutations、Actions、Getters。
