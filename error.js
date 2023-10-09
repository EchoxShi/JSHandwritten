// throw new Error('error.js 抛出了一个错误') // 同步错误 能捕获到
// Promise.reject(1) 异步错误 捕获不到

// 异步中的运行时错误 可以捕获到。但这不是用的try catch 吗？ 哦， 不用try catch也可以用onerror 捕获到。
// 使用setTimeout模拟异步操作
setTimeout(() => {
  // 在异步回调函数中引发错误
  // try {
    // 尝试访问未定义的变量foo
    console.log(foo);
  // } catch (error) {
    // 捕获错误并打印错误信息
    // console.error('捕获到了错误：', error.message);
  // }
}, 1000);

console.log('异步操作后的代码继续执行');

// 此处故意制造一个全局错误
undefinedFunction(); // 这个函数未定义


 // 语法错误1   能被捕获 
//  if (condition {
//   // 缺少右括号
//   console.log('条件成立');

 // 语法错误2   能被捕获 
// var a =\ 'a' 

// 资源加载错误  可以被 addEventListener 捕获到。
const img = new Image();
img.src = "non_existent_image.jpg"; // 试图加载不存在的图片