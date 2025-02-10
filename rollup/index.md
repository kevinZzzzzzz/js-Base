npm init -y

npm i -D rollup

# 核心，用于打包

npm i -D @rollup/plugin-babel

# 核心，让 rollup 无缝衔接 babel

npm i -D @babel/preset-typescript

# 核心，让 babel 能够编译 ts 文件（不会进行类型检查）

npm i -D @rollup/plugin-node-resolve

# 可选，用于解析代码中的外部依赖，添加该插件后默认会将所有依赖打包进 build.js 中

npm i -D @rollup/plugin-commonjs

# 可选，外部依赖的导出大部分是 commonjs 格式，需要先进过该插件的处理

npm i -D @rollup/plugin-node-resolve

# rollup 默认不会自动判断扩展名，所以需要通过该插件来自动解析扩展名

npm i -D @rollup/plugin-terser

# 可选，最小化打包后的代码。

npm i -D @babel/preset-env

# 可选，将代码转译为 ES6，比如箭头函数变成普通函数

npm i log-snapshot the-answer

# 可选，用于测试外部模块的打包
