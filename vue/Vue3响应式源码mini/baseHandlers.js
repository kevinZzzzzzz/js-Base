import { track,trigger} from "./effect.js"

const get = createGetter(); // 创建get方法
const set = createSetter(); 
// 收集 shallow 浅显 
function createGetter(shallow = false) {

    // {a:1,b:2,c:{d:{e:1,f:2}} 递归
    return function get(target,key,receiver) {
        console.log('target被读取值',target,key);
        track(target,"get",key);
        // 设置源对象键值 target[key] = value
        let res = target[key];

        return res;
    }
}
function createSetter() {
    return function set(target,key,value,receiver) {
        const res = Reflect.set(target,key,value,receiver)
        trigger(target,"set",key);
        return res;
    }
}


export const mutableHandlers = {
    get,
    set
}

const shallowReactiveGet = createGetter(true)
export const shallowReactiveHandlers = {
    get:shallowReactiveGet,
    set
}
