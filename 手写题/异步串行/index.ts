/**
 * @method {*} AsynchronousList 异步串行
 * @param {*} effects 执行事件队列
 * 旨在异步、同步事件按照执行顺序返回结果
 */
export const AsynchronousList = (effects = []) => {
  if (!effects.length) return false
  return effects.reduce((promise, currentFunction: Function) => {
    return promise.then(() => {
      return currentFunction()
    })
  }, Promise.resolve())
}
