### MVC：model-view-controller，即模型-视图-控制器。
MVC是一种软件设计典范，用一种业务逻辑、数据、界面显示分离的方法组织代码，将业务逻辑聚集到一个部件里面，在改进和个性化定制界面及用户交互的同时，不需要重新编写业务逻辑。MVC被独特的发展起来用于映射传统的输入、处理和输出功能在一个逻辑的图形化用户界面的结构中。
MVC是Model-View-Controller的简写。Model代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑。View代表UI组件，它负责将数据模型转化成UI展现出来。Controller负责业务逻辑，并在适当的时候与Model和View交互。Model不依赖于View，也就是说Model可以被单独测试。View不依赖于Model，也就是说View可以被单独测试。Controller被Model和View引用，它依赖于Model和View。
  Model：负责应用程序的数据与业务逻辑
  View：负责应用程序的用户界面
  Controller：负责应用程序的逻辑控制


### MVVM:
  Model：负责应用程序的数据与业务逻辑
  View：负责应用程序的用户界面
  ViewModel：负责应用程序的逻辑控制,介于Model和View之间，处理用户操作与Model的交互, 并为View提供渲染的数据。是一个封装视图状态和行为的抽象层。
            通过双向数据绑定把view的修改同步到model中，和把model的修改同步到view上，这使得View和Model可以独立开发和测试。
            包含一个或多个属性，这些属性与view的ui元素绑定，当model触发一个属性变化时，view会自动更新。


两者的区别：
1、数据绑定：MVVM模式通过双向绑定实现视图和数据的同步
            MVC模式，视图和控制器直接是单向的，是通过事件来同步数据，
2、视图模型：MVVM引入了ViewModel的概念，专门用于管理视图状态和行为的组件
            MVC模式控制器controller负责处理用户输入和更新模型，相当于直接操作影响视图
3、视图更新：MVC模式中，视图更新是单向的，由控制器负责更新，
            MVVM模式中，视图更新是双向的，由视图模型负责更新，
 