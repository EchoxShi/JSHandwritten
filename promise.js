let p1 = new Promise((resolve, reject) => {
  resolve(1)
})
console.log(p1.result)
p1.then(value => console.log(value))