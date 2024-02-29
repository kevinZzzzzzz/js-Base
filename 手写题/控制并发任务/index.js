/*
  设计一个SuperTask类
  期望结果:
    10000毫秒后输出 任务1完成
    5000毫秒后输出 任务2完成
    8000毫秒后输出 任务3完成
    12000毫秒后输出 任务4完成
    15000毫秒后输出 任务5完成
*/
// 睡眠函数
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
class SuperTask {
  constructor(parallelCount = 2) {
    this._tasks = [] // 任务队列
    this.parallelCount = parallelCount // 限定并行的数量
    this.runningCount = 0 // 正在运行的数量
  }
  add(task) {
    return new Promise((resolve, reject) => {
      this._tasks.push({
        task,
        resolve,
        reject
      })
      this._run()
    })
  }
  _run() {
    while (this.parallelCount > this.runningCount && this._tasks.length) {
      // 拿到任务队列中的第一个任务，并把原任务队列中的第一个任务删除。
      const {task, resolve, reject} = this._tasks.shift()
      this.runningCount++
      Promise.resolve(task()).then(resolve, reject).finally(() => {
        this.runningCount--
        this._run()
      })
    }
  }
}
let superTask = new SuperTask()
function addTask(time, name) {
  superTask
  .add(() => timeout(time))
  .then(() => console.log(`${time}毫秒后，任务${name}完成`))
}

addTask(10000, 1); 
addTask(5000, 2);
addTask(3000, 3);
addTask(4000, 4);
addTask(5000, 5);