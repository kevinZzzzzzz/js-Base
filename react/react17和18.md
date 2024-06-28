## react18有哪些更新
- setState自动批处理
  react17只有react事件会进行批处理，原生js时间、promise，但是setTimeout、setInterval不会
  react18会讲所有事件都进行批处理，所谓批处理就是将多次setState合并成1次处理，提高性能
    在数据层，将多个状态更新合并成一次处理
    在视图层，将多次渲染合并成一次渲染