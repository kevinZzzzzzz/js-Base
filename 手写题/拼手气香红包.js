/* 
  实现一个拼手气抢红包算法
  提供了一个RedPackage的类，初始化时传入红包金额和个数，需要实现一个openRedPackage方法，每调一次都进行一次“抢红包”，并以console.log的形式输出抢到的红包金额。
 */

class RedPackage {
  money = 0 // 总额
  count = 0 // 红包数量
  _remain = 0 // 剩下的
  constructor(money, count) {
    this.money = money
    this.count = count
    this._remain = money
  }
  openRedPackage(num) {
    // 如果已经抢完
    if (this.count <= 0) {
      console.log('红包被抢完了～～～～～')
      return
    }

    // 剩下一个
    if (this.count === 1) {
      this.count--
      console.log(this._remain)
      return
    }

    // 设置随机比例
    const ratio = (Math.random() || 0.1) * (this._remain / this.money)
    let youCanGet = (this.money * ratio).toFixed(2)
    const tempRemain = +(this._remain - youCanGet).toFixed(2)
    const allLeast = this.count * 0.01 // 保证剩余每一个都至少有0.01

    // 兜底处理 如果剩余的金额不满足剩下的每个人分到0.01
    if (tempRemain < allLeast) {
      youCanGet = +(this._remain - allLeast).toFixed(2)
      this._remain = allLeast
    } else {
      this._remain = tempRemain
    }
    console.log(`恭喜${num}获得${youCanGet}`)
    // console.log(this.count)
    this.count--
  }
}
const redPackage = new RedPackage(100, 20)
for(let i = 0; i <= 20; i++) {
  redPackage.openRedPackage(i)
}