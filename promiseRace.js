// 原生的
let p1 = new Promise((resolve, reject) => {
  resolve(4)
})
// 1.在有非promise对象，或已敲定的promise时，race 会返回其中的第一个。
Promise.race([1,Promise.resolve(3), p1]).then(value => {
  console.log(value) //1
})

// 正常的使用
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('p2'), 1000)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('p3'), 500)
})
Promise.race([p2,p3]).then(value => {
  console.log(value) // p3
})

// 手写题1. 如果有好几个请求，怎么判断是否有一请求超时（比方说超过3s）
// 使用Promise.race 方法，写一个超时promise 插入到数组中
function timeoutPromise(time = 0){
  // 这个promise time 后失败
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('超时')
    }, time)
  })
}
// 测试 手写题1
Promise.race([p2,p3,timeoutPromise(100)]).then(value => {
  console.log(value)
}, error => {
  console.log(error)
})

// 手写题2. 手写promise.race
// 思路是：返回的promise状态只能改变一次，由数组中某个最先敲定的promise的回调来改变。
function promiseRace(promises){
  return new Promise((resolve, reject) => {
    for(let i = 0; i < promises.length; i++){
      // 把resolve, reject 注入到then 中。
      promises[i].then(resolve, reject)
    }
  })
}

promiseRace([p2,p3,timeoutPromise(100)]).then(value => {
  console.log(value)
}, error => {
  console.log(error)
})