export default class LogPlugin {
  apply (hooks) {
    hooks.on('pressedPlus', (currentVal, addend) => {
      console.log(`pressedPlus: ${currentVal} + ${addend}`)
    })
    hooks.on('pressedMinus', (currentVal, subtractor) => {
      console.log(`pressedMinus: ${currentVal} - ${subtractor}`)
    })
    hooks.on('valueChanged', (currentVal) => {
      console.log(`valueChanged: ${currentVal}`)
    })
  }
}