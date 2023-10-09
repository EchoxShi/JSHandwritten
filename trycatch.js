// try catch 可以捕获什么错误
// 1. 不能捕获异常错误，可以看到控制台直接打印错误，UnhandledPromiseRejectionWarning，并没有被 catch 模块捕获到
try {
  let p1 = new Promise((resolve, reject) => {
    reject(12)
  })
} catch (error) {
  console.log('1.出错了', error)
}
// 2. promise的异常，应该在 then的回调中捕获，或者是catch里捕获
// 3. 可以捕获语法错误
try {
  const a = 2
  a = 3
} catch (error) {
  console.log('3.出错了: 常量不能被赋值', error)
}

// 4. 运行时错误（Runtime Error）：这是在代码执行期间引发的错误，例如访问未定义的变量或调用不存在的函数。
try {
  let x = y; // y 未定义，引发 ReferenceError
} catch (error) {
  console.error('4. 捕获到运行时错误:', error);
}