const http = require('http');

// 创建一个HTTP服务器
const server = http.createServer((req, res) => {
  // 设置响应头，允许跨域请求
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 如果是POST请求
  if (req.method === 'POST') {
    let data = '';

    // 监听数据流事件
    req.on('data', (chunk) => {
      data += chunk;
    });

    // 监听请求结束事件
    req.on('end', () => {
      // 在这里处理接收到的数据
      console.log('接收到的数据:', data);

      // 发送响应
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('数据已接收');
    });
  } else {
    // 对于非POST请求，返回错误信息
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('只支持POST请求');
  }
});

const port = 3000;

// 启动服务器，监听指定端口
server.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
