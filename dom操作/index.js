const list = document.getElementById('list')

// 操作5次
// for(let i = 0; i < 5; i++) { 
//     const item = document.createElement('li')
//     item.innerHTML = `项目${i}`
//     list.appendChild(item)
// }

// 利用文档碎片减少dom操作
const fragment = document.createDocumentFragment()

for(let i = 0; i < 5; i++) {
    const item = document.createElement('li')
    item.innerHTML = `项目${i}`
    fragment.appendChild(item)
}
list.appendChild(fragment)// 将5次dom操作缩成一次
console.log(fragment)
