export default class LimitPlugins {
  apply (hooks) {
    hooks.on('valueWillChanged', (newVal) => {
      if (100 < newVal) {
        console.log('不能超过100')
        return false
      }
      return true
    })
  }
}