/**
 * 如果有100个请求，你如何使用Promise控制并发？
 */
const urlList = new Array(100).fill("xxx");

const pool = new Set(); // 请求池
const waitQueue = [];
const request = (url) => {
  return new Promise((res, rej) => {
    // 最大并发数
    const isFull = pool.size >= 10;
    const fn = () => {
      const request = fetch(url);
      request.finally(() => {
        pool.delete(fn);
        const next = waitQueue.shift();
        next && pool.add(next);
        setTimeout(() => {
          next?.();
        }, 0);
      });
      request.then(res);
      request.catch(rej);
      return request;
    };
    if (isFull) {
      waitQueue.push(fn);
    } else {
      pool.add(fn);
      fn();
    }
  });
};

for (let [index, url] of urlList.entries()) {
  request(url).then(() => console.log("=====", index));
}
