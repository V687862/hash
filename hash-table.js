const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    this.count = 0
    this.capacity = numBuckets
    this.data = new Array(this.capacity).fill(null)


  }

  hash(key) {
    const hashStr = sha256(key)
    return parseInt(hashStr.substring(0,8), 16)
  }

  hashMod(key) {
    return this.hash(key) % this.capacity
  }

  insertNoCollisions(key, value) {
    const index = this.hashMod(key)
    if (this.data[index]) {
      throw new Error('hash collision or same key/value pair already exists!')
    }
    this.data[index] = new KeyValuePair(key, value)
    this.count ++
  }

  insertWithHashCollisions(key, value) {
    const index = this.hashMod(key)
    const newPair = new KeyValuePair(key, value)
    if (!this.data[index]) {
      this.data[index] = newPair
    }
    else {
      newPair.next = this.data[index]
      this.data[index] = newPair
    }
    this.count ++
  }

  insert(key, value) {
    
  }

}


module.exports = HashTable;
