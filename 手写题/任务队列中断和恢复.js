/**
* 依次顺序执行一系列任务
* 所有任务全部完成后可以得到每个任务的执行结果
* 需要返回两个方法 start用于启动任务，pause用于暂停任务
* 每个任务具有原子性，即不可中断，只有在两个任务之间中断
* @params (...Functions) tasks 任务队列 每个任务无参 异步
*/

function processTasks(...tasks) {
  let isRunning = false // 表示任务是否在执行
  const result = new Array(tasks.length) // 装所有任务的结果
  let i = 0
  return {
    start() {
      return new Promise(async (resolve) => {
        if (isRunning) {
          return
        }
        isRunning = true
        // 依次执行任务
        while(i < tasks.length) {
          let k = i
          console.log(`正在执行第${k}个任务`)
          const r = await tasks[k]()
          result[k] = r 
          console.log(`第${k}个任务执行完毕`)
          i++
          if (!isRunning) { // 暂停终止
            return
          }
        }
        isRunning = false
        resolve(result) // 只有当所有任务完成时才能得到所有结果
      })
    },
    pause() {
      isRunning = false // 设置中断
    }
  }
}