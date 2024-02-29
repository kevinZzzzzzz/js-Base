/* 
  JS请求并发数控制以及重发
  请实现如下的函数，可以批量请求数据，所有的URL地址在urls参数中，同时可以通过max参数 控制请求的并发度。当所有的请求结束后，需要执行callback回调。发请求的函数可以直接使用fetch。
*/
var p1 = () => new Promise((resolve, reject) => setTimeout(reject, 1000, "p1"));
var p2 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, "p2"));
var p3 = () => new Promise((resolve, reject) => setTimeout(reject, 1000, "p3"));
var p4 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, "p4"));
var p5 = () => new Promise((resolve, reject) => setTimeout(reject, 1000, "p5"));
var p6 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, "p6"));
var p7 = () => new Promise((resolve, reject) => setTimeout(reject, 1000, "p7"));
var p8 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, "p8"));
var p9 = () => new Promise((resolve, reject) => setTimeout(reject, 1000, "p9"));
var p10 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, "p10"));
var p11 = () =>
  new Promise((resolve, reject) => setTimeout(reject, 1000, "p11"));
var p12 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, "p12"));
var p13 = () =>
  new Promise((resolve, reject) => setTimeout(reject, 1000, "p13"));
var p14 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, "p14"));
var tasks = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14];

class TaskScheduler {
  /**
   * @params _tasks 请求队列
   * @params maxNum 最大并发数
   * @params callTime 错误重发次数
   * @params callback 回调
   */
  constructor(tasks, maxNum, callTime, callback) {
    this.maxNum = maxNum;
    this.running = 0;
    this._tasks = tasks;
    this.callTime = callTime;
    this.results = [];
    this.callback = callback;
    this.next();
  }
  next() {
    while (this.maxNum > this.running && this._tasks.length) {
      let task = this._tasks.shift();
      let count = 0; // 统计错误次数
      const run = async (task) => {
        try {
          console.log("Succ running", task);
          const res = await task();
          this.results.push(res);
          console.log("res", res);
          this.running--;
          this.next();
        } catch (err) {
          console.log("try again");
          count += 1;
          if (count < this.callTime) {
            run(task);
          } else {
            console.log("try fail", err);
            this.results.push(err);
            this.running--;
            this.next();
          }
        }
      };
      run.call(null, task);
      this.running++;
    }
    if (this.callback && this.running == 0) {
      this.callback.call(null, this.results);
    }
  }
}
new TaskScheduler(tasks, 4, 2, (res) => {
  console.log("all done", res);
});
