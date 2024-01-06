// async function getUser() {
//   return (await fetch('./1.json')).json()
// }

// async function m1() {
//   const user = await getUser()
//   return user
// }

// async function m2() {
//   const user = await m1()
//   return user
// }

// async function m3() {
//   const user = await m2()
//   return user
// }

// async function main() {
//   const user = await m3()
//   console.log(user, 'user----')
// }
// main()

/* fetch('./1.json').then(res => {
  return res.json()
}).then(s => {
  console.log(s)
}) */
/* 
  异步转同步处理 消除副作用
*/
function getUser() {
  return fetch('./1.json')
}

function m1() {
  const user = getUser()
  return user
}

function m2() {
  const user = m1()
  return user
}

function m3() {
  const user = m2()
  return user
}

function main() {
  console.log('begin main')
  const user = m3()
  console.log(user, 'user----')
}


function run(func) {
  // 1. 改动fetch
  const oldFetch = window.fetch
  const cache = {
    status: 'pending', // fulfilled rejected
    value: null
  }
  const newFetch = function (...args) {
    // 有缓存返回缓存
    if (cache.status === 'fulfilled') {
      return cache.value
    } else if (cache.status === 'rejected') {
      throw new cache.value
    }
    // 没有缓存
    // 发起请求
    const p = oldFetch(...args)
      .then(data => data.json())
      .then((data) => {
        cache.status = 'fulfilled'
        cache.value = data
      })
      .catch(err => {
        cache.status = 'rejected'
        cache.value = err
      })
    // 抛出错误
    throw p
  }
  window.fetch = newFetch
  // 2. 执行func
  try {
    func()
  } catch (err) {
    // 等待请求完成之后重新运行func
    if (err instanceof Promise) {
      err.finally(() => {
        window.fetch = newFetch
        func()
        window.fetch = oldFetch
      })
    }
  }
  // 3. 改回fetch
  window.fetch = oldFetch
}
run(main)