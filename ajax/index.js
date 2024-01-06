
function myAjax(url) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET',url, true) // 请求方法，请求地址，是否异步
        xhr.onreadystatechange = function() {
            console.log(xhr,'xhr.readyState')
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject(new Error('请求失败了'))
                }
            }
        }
        xhr.send(null)
    })
    return promise
}
const url = './mock/data.json'
myAjax(url).then(data => {
    console.log(data.name)
}).catch(err => {
    console.log(err)
})
