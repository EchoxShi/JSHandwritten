// lib.js
var counter = 3;
var obj = {age: 1}
function incCounter() {
  obj.age++
  console.log(obj.age)
  counter++;
}
module.exports = {
  obj:obj,
  counter: counter,
  incCounter: incCounter,
};
