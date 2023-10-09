const http = require('http');
const url = require('url');
const server = http.createServer((req, res) => {
  // 解析URL
  const parsedUrl = url.parse(req.url, true);
  // 检查是否有名为 "callback" 的查询参数
  const callback = parsedUrl.query.callback;
  // 要返回的JSON数据
  const jsonData = {
    message: 'Hello, JSONP!',
    name: '小花',
    age: 18,
  };
  // 设置HTTP响应头
  res.setHeader('Content-Type', 'application/javascript');
  // 如果有回调函数名，则包装JSON数据在回调函数中
  if (callback) {
    const response = `${callback}(${JSON.stringify(jsonData)})`;
    res.end(response);
  } else {
    // 如果没有回调函数名，则直接返回JSON数据
    res.end(JSON.stringify(jsonData));
  }
});
const port = 3000; // 选择一个端口号，例如3000
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
