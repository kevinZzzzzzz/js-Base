## Vuex 核心思想
> 当组件需要修改状态时，会触发一个Action，Action会通过commit发送一个Mutation，Mutation会改变State。State的改变会触发组件的重新渲染。

> Vuex的核心思想是集中式管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

>
> Vuex的核心概念包括：
> State：存储应用的状态，是组件之间共享的数据源。
> Getters：从State中派生出一些状态，类似于计算属性。
> Mutations：唯一允许更新State的方法，必须是同步函数。
>Actions：用于提交Mutations，可以包含异步操作。
>Modules：将Store分割成模块，每个模块拥有自己的State、Mutations、Actions、Getters。
