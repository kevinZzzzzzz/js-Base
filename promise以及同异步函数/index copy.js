// async函数执行，返回的是promise对象
async function test1() {
    return 1
}
async function test2() {
    // let promise =  new Promise()
    return Promise.resolve(2)
}
const result1 = test1()
const result2 = test2()

console.log(result1,'result1')
console.log(result2,'result2')

// Promise.then 成功的情况，对应await
async function test3() {
    const p3 = Promise.resolve(3)
    console.log(p3,'p3')
    p3.then(data => {
        // console.log(data, 'data')
    })
    const data1 = await p3
    const data2 = await 4
    const data3 = await test1()
    const data4 = await test2()
    console.log(data1, 'data1')
    console.log(data2, 'data2')
    console.log(data3, 'data3')
    console.log(data4, 'data4')
}
test3()

// promise.catch 失败的情况 对应的try...catch中的catch
async function test4() {
    // const p4 = Promise.resolve(4)
    const p4 = Promise.reject(4)
    try {
        console.log(p4,'p4')
        const data4 = await p4  //await 执行Promise.resolve
        console.log('data4',data4)
    } catch(e) {
        // console.error('e',e)
    }
}
test4()


// async的执行顺序问题
async function test5() {
    console.log('test5 begin')
    const result = await test6()
    console.log('result', result)
    console.log('test5 end')
}
async function test6() {
    console.log('test6')
}
console.log('script begin')
test5()
console.log('script end')
/**
 * script begin
   test5 begin
   test6
   script end
   result undefined  // 执行完await函数后 后面的代码相当于会放到一个异步的环境中，或者是eventloop中callback内
                        等到同步代码执行完成 eventloop会到callback quene中找是否有要执行callback
   test5 end
 * */ 



async function getSomething() {
    return "something";
}

async function testAsync() {
    return Promise.resolve("hello async");
}
console.log(getSomething(), testAsync());
async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
}
setTimeout(() => {
    console.log(1)
},0)
test();