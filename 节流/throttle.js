// 节流: 当持续触发事件时，保证一定时间段内只调用一次事件处理函数,比如水龙头在某个时间间隔内有规律的一滴一滴的往下滴
    // 或者说在一段时间内，只执行一次某个操作，过了一段时间还有操作的话，继续执行新的操作，达到降低频率的效果
window.addEventListener('mousemove',throttle(() => {
    console.log('鼠标移动了')
},2000))
// 时间戳的方式实现
function throttle (fn,delay) {
    let prev = Date.now() // 一段周期内的第一次触发
    return function() {
        let self = this
        let now = Date.now() // 一段周期内的第二次触发
        if (now - prev >= delay) {
            fn.apply(self)
            prev = now
        }
    }
}

// 定时器的方式实现
// function throttle (fn, delay) {
//     let timer = null
//     return function() {
//         if(!timer) {
//             timer = setTimeout(() => {
//                 fn.apply(this)
//                 timer = null
//             },delay)
//         }
//     }
// }
