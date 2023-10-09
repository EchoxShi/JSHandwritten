
// 使用promise 封装ajax 请求
// async 是否发送异步请求
// 收到响应后 xhr 对象四个属性会被填充：
// status：http状态码，statusText:http 状态描述，responseText: 响应体， responseXML 类型是xml时， 响应体会也会放这里
// let xhr = XMLHttpRequest() //XMLHttpRequest 是浏览器中的内置对象,node 环境下没有

// readyState 属性，代表请求响应阶段：0,1,2,3,4，分别是：未初始化，已打开，已发送，接收中，已完成
console.log(xhr.status);
function ajaxPromise(method, url, data, async){
  return new Promise((resolve, reject) => {
    let xhr = XMLHttpRequest()
    xhr.open(method, url, async)
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
          console.log('拿到响应体为：',xhr.responseText)
          resolve(xhr.responseText)
        } else {
          console.log('请求没有完成',xhr.status)
        }
      }
    }
    // 事件处理函数都是小写
    xhr.onerror = function (error) {
      console.error('请求错误:', error);
      reject(error);
    };
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }
    switch (method) {
      case 'GET':
        xhr.send(null);//兼容浏览器
        break;
      case 'POST':
      case 'PUT':
      case 'PATCH':
        xhr.send(JSON.stringify(data));
        break;
      case 'DELETE':
        xhr.send();
        break;
      default:
        console.error('不支持的请求方法:', method);
        reject(new Error(`不支持的请求方法: ${method}`));
    }
  })
}
// export default ajaxPromise