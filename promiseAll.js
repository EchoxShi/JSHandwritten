function promiseAll(promises){
  return new Promise((resolve, reject) => {
    if(!Array.isArray(promises)){
      throw new TypeError("promises must be Array")
    }
    let len = promises.length
    let res = []
    let count = 0
    for(let i = 0; i < len; i++){
      // Promise.resolve()的作用是 把不是promise的参数转成promise, 如果参数是promise, 就直接返回。
      Promise.resolve(promises[i]).then(value => {
        count++
        res[i] = value
        if(count === len){
          return resolve(res)
        }
      }, error => {
        return reject(error)
      })
    }
  })
}

// 测试
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(5), 1000)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(2), 1000)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(3), 1000)
})
// 假如穿进去的一个不是promise对象
promiseAll([1,p2,p3]).then(value => console.log(value))
