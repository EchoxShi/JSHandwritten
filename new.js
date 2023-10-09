function mynew(func, ...args){
  if(typeof func !== 'function'){
    throw TypeError('f m b f')
  }
  let newObj = Object.create(Object.getPrototypeOf(func))
  let res = func.apply(newObj, args)
  if (res && (typeof res === 'function' || typeof res === 'object')){
    newObj = res
    res = null
  }
  return newObj
}

function apple(name){
  return {name: name}
}
let obj = mynew(apple, 123)
console.log(obj)
