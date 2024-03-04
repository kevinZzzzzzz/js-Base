/* 
  实现 batchFn 函数, 批量执行函数
*/
const batcher = (fn) => {
  let options = []
  let cache = undefined
  return async (args) => {
    options = [...options, ...args]
    if (cache) {
      return cache
    }
    const p = new Promise(async (resolve, reject) => {
      const result = await fn(options)
      const map = result.reduce((acc, cur, idx) => {
        const v = options[idx]
        acc[v] = cur
        return acc
      }, {})
      resolve(args.map(a => map[a]))
    })
    cache = p
    return p
  }
}


let executeCount = 0;
const targetFn = async nums => {
  executeCount++;
  return nums.map(num => 2 * num + 1);
};


const batchedFn = batcher(targetFn);

const main = async () => {
  const [result1, result2, result3] = await Promise.all([
    batchedFn([1, 2, 3]),
    batchedFn([4, 5]),
    batchedFn([6, 7]),
  ]);
  
  console.log(result1, result2, result3) 
  console.log(executeCount)  // 预期为 1
}

main()