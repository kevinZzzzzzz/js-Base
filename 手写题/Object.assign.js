// Object.assign()主要是将所有可枚举属性的值从一个或多个源对象复制到目标对象，同时返回目标对象

Object.myAssign = function (target, ...source) {
  if (target === null) throw new Error(123);
  let ret = Object(target);
  source.forEach((obj) => {
    if (obj != null) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          ret[key] = obj[key];
        }
      }
    }
  });
  return ret;
};
