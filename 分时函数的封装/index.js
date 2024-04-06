const btn = document.querySelector('.btn')
const data = new Array(100000).fill(0).map((_, i) => i)


// 总共耗时184.305908203125 ms
// btn.onclick = () => {
//   console.time()
//   for (const i of data) {
//     const div = document.createElement('div')
//     div.innerText = i
//     document.body.appendChild(div)
//   }
//   console.timeEnd()
// }

// 优化后  分段渲染 0.064208984375 ms
/* 
  需考虑问题
  1、下一次分片什么时候开始
  2、每一次分片执行多少
*/
btn.onclick = () => {
  const createDiv = (i) => {
    const div = document.createElement('div')
    div.innerText = i
    document.body.appendChild(div)
  }
  const scheduler = (task) => {
    // setTimeout(() => {
    //   const now = performance.now()
    //   task(() => performance.now() - now <= 10)
    // }, 1000);
    requestIdleCallback((idle) => {
      task(() => idle.timeRemaining())
    })
  }
  performChunks(data, createDiv, scheduler)
}

function performChunks(data, taskHandler, scheduler) {
  if (data.length === 0) return
  let i = 0
  // 开启下一分片的执行
  function _run() {
    if (i >= data.length) return
    // 一个渲染帧中，空闲时间开启分片执行
    scheduler((goOn) => {
      while(goOn() > 0 && i < data.length) {
        taskHandler(i)
        i++
      }
      // 一个分片执行完毕，开启下一个分片
      _run()
    })
  }
  console.time()
  _run()
  console.timeEnd()
}