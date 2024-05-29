const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const app = express();
// 配置 CORS 中间件
app.use(cors());
// 配置 Express 路由
app.get('/vi/health', (req, res) => {
  res.send('230614');
});

// 创建 HTTP 服务器
const server = http.createServer(app);

// 将 WebSocket 服务器附加到 HTTP 服务器
const wss = new WebSocket.Server({ server });

wss.on('connection', socket => {
  console.log('Client connected');

  socket.on('message', message => {
    console.log(`Received: ${message} ${new Date().toLocaleString()}`);
  });

  // 定时获取数据
  setInterval(() => {
    socket.send(JSON.stringify({
      type: 'getcoverage',
    }));
  }, 1000);

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});



// 启动服务器
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
