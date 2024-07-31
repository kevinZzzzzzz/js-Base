## React 和 Babel

@babel/preset-react 的作用：将 jsx 转译为一个名为 React.createElement()函数调用，最后转化为真实 dom
createElement()实际创建了一个 react 对象（类似 AST 的 dom 对象）

### 元素标签转译

```
  <div id="foo">bar</div>
  转译为
  React.createElement('div', {id: "foo"}, "bar")
```

createElement 的第一个参数是元素类型 type，第二个参数是元素属性 config，第三个参数是子元素 children

### 组件转译

```
    function Foo({id}) {
      return <div id={id}>foo</div>
    }

    <Foo id="foo">
      <div id="bar">bar</div>
    </Foo>
  转译为
    function Foo({id}) {
      return React.createElement("div", {id: id}, "foo")
    }

    React.createElement(Foo, {id: "foo"},
      React.createElement("div", {id: "bar"}, "bar")
    );
```

### 子元素转译

```
  <div id="foo">
    <div id="bar">bar</div>
    <div id="baz">baz</div>
    <div id="qux">qux</div>
  </div>
  转译
  React.createElement("div", { id: "foo"},
    React.createElement("div", {id: "bar"}, "bar"),
    React.createElement("div", {id: "baz"}, "baz"),
    React.createElement("div", {id: "qux"}, "qux")
  );

```

通过查看[源码](https://github.com/facebook/react/blob/main/packages/react/src/jsx/ReactJSXElement.js)，可以看出 creactElement 函数主要是做了个预处理，将处理好的数据传给 ReactElement 函数

### 元素和组件的区分

元素：Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用
组件：函数组件和 class 组件，Babel 会将其转译为一个函数调用

## 总结

```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

React.createElement() 会预先执行一些检查

```
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。
```
