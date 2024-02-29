/* 
  等待3s
  william is notified
  等待5s
  Start to commit
*/
function arrange(name) {
  const tasks = []
  tasks.push(() => {
    console.log(`${name} is notified`)
  })
  function wait(time) {
    tasks.push(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`等待${time}s`)
          resolve()
        }, time * 1000);
      })
    })
    return this
  }
  function doSomething(something) {
    tasks.push(() => {
      console.log(`start to ${something}`)
    })
    return this
  }
  function waitFirst(time) {
    tasks.unshift(() => { // 第一个
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`等待${time}s`)
          resolve()
        }, time * 1000);
      })
    })
    return this
  }
  // 执行
  async function execute() {
    for (let i in tasks) {
      await tasks[i]()
    }
    return this
  }
  return {
    wait,
    do: doSomething,
    waitFirst,
    execute
  }
}

arrange('william')
  .wait(5)
  .do('commit')
  .waitFirst(3)
  .execute()