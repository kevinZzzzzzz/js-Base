## devDependencies 和 dependencies 的区别

!!!!!! 只要是项目中用到的依赖（且安装到 node_modules 中），不管这个依赖是放在 devDependencies 还是放在 dependencies ，都会被打包工具解析、构建，最后都打进 dist 产物中

1. dependencies
   dependencies 字段用于列出项目运行时必需的模块。当你将一个模块添加到 dependencies 时，意味着这个模块对于你的项目在生产环境下的正常运行是必不可少的。例如，如果你正在构建一个使用 Express 的 Web 服务器，那么 Express 应该被添加到 dependencies 中。

2. devDependencies
   devDependencies 字段用于列出开发过程中需要的模块，但在生产环境中并不需要。这些通常包括测试工具、构建工具、编译器、预处理器、代码风格检查工具等。例如，如果你使用 Jest 来进行单元测试，那么 Jest 应该被添加到 devDependencies 中。
