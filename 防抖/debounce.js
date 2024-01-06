// 防抖：一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始计时


/* 
    实际应用
    1、浏览器改变宽度，希望重新渲染
    2、输入搜索：输入结束后几秒才进行搜索请求，几秒内持续输入，则重新计时
*/
const inputDom = document.getElementById('hInput')

function debounce(fn,delay) {
    let timer = null
    return function() {
        let self = this
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(self)
        },delay)
    }
}

inputDom.addEventListener('input', debounce(() => {
    console.log('发送搜索请求')
},1000))

document.addEventListener('mousemove', debounce(() =>{
    console.log('鼠标移动')
},1000))



