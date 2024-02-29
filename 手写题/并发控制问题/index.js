/* 
  几秒后执行
*/
// 睡眠函数
function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time);
  })
}

class SuperTask {
  constructor(paralleCount = 2) {
    // 并发的数量
    this.paralleCount = paralleCount
    this.tasks = []
    this.runningCount = 0 // 正在处理的事件数量
  }
  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve,
        reject
      })// 排入队列
      this._run()
    })
  }
  _run() {
    while (this.runningCount < this.paralleCount && this.tasks.length) {
      const {task, resolve, reject} = this.tasks.shift()
      this.runningCount++
      // 将task函数强制包装成promise
      Promise.resolve(task()).then(resolve, reject).finally(()=> {
        this.runningCount--
        this._run()
      })
    }
  }
}

const superTask = new SuperTask()

function addTask(time, name) {
  superTask
  .add(() => timeout(time))
  .then(() => console.log(`${name} 完成`))
}

addTask(10000, 1) // 10000ms后输出
addTask(5000, 2) // 5000ms后输出
addTask(3000, 3) // 8000ms后输出
addTask(4000, 4) // 12000ms后输出
addTask(5000, 5) // 15000ms后输出

