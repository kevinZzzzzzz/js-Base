const SERVER_URL = '/server'
let xhr = new XMLHttpRequest()
// 创建Http请求
xhr.open('GET', SERVER_URL, true)

// 设置状态监听函数
xhr.onreadystatechange = function() {
  if (this.readyState !== 4) return
  // 请求成功
  if (this.status === 200) {
    xxx(this.response)
  } else {
    console.error(this.statusText)
  }
}

xhr.onerror = function() {
  console.error(this.statusText)
}
// 设置请求头信息
xhr.responseType = 'json'
xhr.setRequestHeader('Accept', 'application/json')
// 发送Http请求
xhr.send(null)

/* 
  promise封装AJAX
*/
function getJSON(url) {
  let promise = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return
      if(this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.onerror = function() {
      reject(new Error(this.statusText))
    }

    xhr.responseType = 'json'
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.send(null)
  })
  return promise
}