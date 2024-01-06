Object.myAssign = function(target, ...source) {
  if (target === null) throw new Error(123)
  let ret = Object(target)
  source.forEach((obj) => {
    if (obj != null) {
      for(let key in obj) {
        if (obj.hasOwnProperty(key)){
          ret[key] = obj[key]
        }
      }
    }
  })
  return ret
}