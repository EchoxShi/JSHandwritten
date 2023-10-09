// Object.create(obj || null) 是返回一个以指定参数为原型的新对象
function create(obj){
  function F(){}
  F.prototype = obj
  return new F()
}

let person = {
  name: '小花',
  age: '18',
}
let res = create(person)
console.log(res.name, res.age);
