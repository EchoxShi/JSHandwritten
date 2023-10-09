// 1. 函数声明的时候不能占用已经声明过的变量名
// let func = 1
// function func() {
//   console.log('这是函数func');
// }
// console.log(func) // SyntaxError: Identifier 'func' has already been declared
// 2. 意外发现： try catch 形成了一个块级作用域
// let num = 1 
// try {
//   let num = 2 // 其实是let 关键字形成了块级作用域
//   console.log('num', num);
// } catch (error) {
//   console.log('let 声明的变量不能重复声明', num);
// }
let test = function test() {
  console.log('test11');
}
console.log(typeof test); //function
test() //test11