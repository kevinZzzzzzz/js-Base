/* 
  LRU缓存算法
  least Recently Used 
  最久未使用
*/

class LRUCache {
  // 私有属性
  #map;
  #length

  constructor(len) {
    this.#map = new Map();
    this.#length = len;
  }

  has(key) {
    return this.#map.has(key);
  }
  get(key) {
    if (!this.#map.has(key)) return null
    const value = this.#map.get(key);
    this.#map.delete(key);
    this.#map.set(key, value);
    return value
  }

  set(key, value) {
    if (this.#map.has(key)) {
      this.#map.delete(key);
    }
    this.#map.set(key, value);
    if (this.#map.size > this.#length) {
      this.#map.delete(this.#map.keys().next().value); // 迭代器知识  删除最末一个值
    }
  }
}