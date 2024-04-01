import a  from './a.js'

async function init() {
  a.injectMethod(() => console.log('injected!')) // 提前注入
  await import('./b.js')
}
init()