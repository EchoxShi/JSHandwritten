// 看left的原型链上有没有出现 构造函数right的原型
function myinstanceof(left, right){
  // left 需要判空， 否则Object.getPrototypeOf(left) 
  // 会报错：TypeError: Cannot convert undefined or null to object
  if(!left) return false
  // left 是 对象，rihgt 是构造函数
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype
  while(proto){
    if(proto === prototype){
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

function person(name, age){
  this.name = name
  this.age = age
}
let person1 = new person('a', 18)
let person2 = {name: 'a', age: 18}
console.log(myinstanceof(person1, person))// true
console.log(myinstanceof(person2, person))// false
console.log(myinstanceof(null, person))// false