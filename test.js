const arr1 = ['1', '49', '1'] // 当前
const arr2 = ['1', '50', '1'] // 最新

let bool = false
bool = arr2.every((e, idx) => {
    if (Number(e) > Number(arr1[idx])) {
        return false
    }
    return true
})

console.log(bool)