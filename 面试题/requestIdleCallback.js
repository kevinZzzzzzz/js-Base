/* 
  执行重计算而非紧急任务
  空闲回调执行时间应该小于 50ms，最好更少
  空闲回调中不要操作 DOM，因为它本来就是利用的重排重绘后的间隙空闲时间，重新操作 DOM 又会造成重排重绘
  React 的时间分片便是基于类似 rIC 而实现，然而因为 rIC 的兼容性及 50ms 流畅问题，React 自制了一个实现: scheduler[4]
*/
window.requestIdleCallback = window.requestIdleCallback || function (fn) {
  let startTime = Date.now()

  return setTimeout(function() {
    fn({
      didTimeout: false,
      timeRemaining: function() {
        return Math.max(0, 50 - (Date.now() - startTime))
      }
    })
  }, 1)
}
