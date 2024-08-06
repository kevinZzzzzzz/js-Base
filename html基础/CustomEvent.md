## CustomEvent 自定义事件

CustomEvent 是一个自定义事件对象，用于表示 DOM 事件。通过 CustomEvent，我们可以创建并触发自定义的事件，实现更灵活的事件处理机制。

```
const myEvent = new CustomEvent('myCustomEvent', {
  detail: {
    message: 'Hello, World！'
  },
  bubbles: true,
  cancelable: true
});

// 触发自定义事件
window.dispatchEvent(myEvent);

// 监听自定义事件
window.addEventListener('myCustomEvent', function(event) {
  console.log(event.detail.message); // 输出: Hello, World！
});
```

#### CustomEvent 接收两个参数：

- type：一个字符串，表示事件的名称。
- eventInitDict：一个配置事件的选项对象，是可选的。这个对象可以包含以下属性：
- bubbles：一个布尔值，表示事件是否冒泡。默认为 false。
- cancelable：一个布尔值，表示事件是否可以被取消。默认为 false。
- detail：包含传递给事件监听器的任何自定义数据的对象。
