const http = require('http');

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  // 设置响应头，指定内容类型为纯文本
  res.setHeader('Content-Type', 'text/plain');
  // 响应头设置cookie
  res.setHeader('Set-Cookie', 'username=JohnDoe1234567890; Max-Age=3600; HttpOnly; Path=/');
  // 处理不同的路由或请求路径
  if (req.url === '/') {
    // 当访问根路径时，返回 "Hello, World!"
    res.end('Hello, World!\n');
  } else if (req.url === '/about') {
    // 当访问 "/about" 路径时，返回自定义信息
    res.end('This is the About Page.\n');
  } else {
    // 处理未知路由，返回 404 Not Found
    res.statusCode = 404;
    res.end('404 Not Found\n');
  }
});

const port = 3000; // 选择一个端口号，例如 3000

// 监听指定的端口和主机
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
