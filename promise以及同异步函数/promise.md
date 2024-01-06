# promise
Promise是es6新增的语法，是为解决回调地狱问题的。
回调地狱带来的问题：
- 代码臃肿
- 可读性差，不好维护
- 容易滋生bug
- 只能在回调里解决异常
`
根据请求1的结果再去执行请求2。。。。。
请求1(function(请求结果1){
        请求2(function(请求结果2){
                请求3(function(请求结果3){
                        请求4(function(请求结果4){
                                请求5(function(请求结果5){
                                        请求6(function(请求结果3){
                                                ...
                                        })
                                })
                        })
                })
        })
})
`
promise写法
`
        new Promise(请求1)
                .then(请求2(请求1结果))
                .then(请求3(请求2结果))
                .catch(异常)
`
Promise状态：pendding、fulfilled、rejected
初始状态是pendding
then、catch 如何改变Promise状态
then、catch在正常返回的时候,promise的状态是fulfilled
当报错的时候，比如throw()、new Error()、promise的状态是reject

fulfilled状态的promise会执行then里的函数
reject状态的promise会执行catch里的函数



## promise 的静态方法
all: 参数是一个promise数组，汇总多个promise的结果，可以将多个异步操作并行处理，当所有操作都成功返回按照请求的顺序返回，一旦有一个失败则走catch
allSettled: 参数是一个promise数组，会将promise数组中的全部执行，无论成功或者失败，返回每个promise的状态和结果
any: 参数是一个promise数组, 只要参数有一个promise成功执行，promise.any()返回的结果就是fulfilled, 只有当参数中全部向都rejected，最后的结果才会是rejected
race: 参数是一个promise数组, 只要promise数组中有一项率先返回，promise.race()最后的结果会跟着这项的结果改变

## async/await和promise
async函数执行，返回的都是promise对象
Promise.then 成功的情况，对应await那行后面的函数，await是执行同步事件
`
        await xx 
        dd 
     =》 
        Promise.resolve(() => { xx }).then(() => {
                dd
        })
`
promise.catch 失败的情况 对应的try...catch中的catch

async函数的执行顺序