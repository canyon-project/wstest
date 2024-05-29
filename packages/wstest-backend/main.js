const WebSocket = require('ws');
// import WebSocket from 'ws';
// console.log(WebSocket,'WebSocket')
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', socket => {
  console.log('Client connected');

  socket.on('message', message => {
    console.log(`Received: ${message}`);
  });

  // 定时获取数据
  setInterval(() => {
    socket.send(`Server time: ${new Date()}`);
  }, 1000);

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');