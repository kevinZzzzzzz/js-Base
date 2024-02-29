/* 
compose()
  效果： 将一系列函数，通过compose函数组合起来，像管道一样连接起来，比如函数结合[f, g, h ]，通过compose最终达到这样的效果： f(g(h()))
  compose函数要求：可执行同步方法，也可执行异步方法，两者都可以兼容
*/
function compose(list) {
  const init = list.shift(); // 取出第一个函数，当作reduce函数的初始值

  return (...args) => {
    return list.reduce(
      (pre, cur) => {
        return pre.then((result) => {
          return cur.call(null, result);
        });
      }, Promise.resolve(init.apply(null, args))
    );
  };
}

let sync1 = data => {
  console.log('sync1')
  return data
}
let sync2 = data => {
  console.log('sync2')
  return data + 1
}
let sync3 = data => {
  console.log('snyc3')
  return data + 2
}

let syncResult = compose([sync1, sync2, sync3])
syncResult(0).then(d => {
  console.log(d, 'syncResult')
  console.log('-------------------------------------------------')
})

let async1 = data => {
  return new Promise(res => {
    setTimeout(() => {
      console.log('async1')
      res(data)
    }, 1000);
  })
}
let async2 = data => {
  return new Promise(res => {
    setTimeout(() => {
      console.log('async2')
      res(data + 1)
    }, (data + 1) * 1000);
  })
}
let async3 = data => {
  return new Promise(res => {
    setTimeout(() => {
      console.log('async3')
      res(data + 2)
    }, (data + 2) * 1000);
  })
}
const asyncResult = compose([async1, async2, async3])
asyncResult(0).then(d => {
  console.log(d, 'asyncResuly')
})
