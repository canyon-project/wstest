// 创建WebSocket连接
const socket = new WebSocket('ws://localhost:8080');

// 当WebSocket连接打开时触发
socket.onopen = () => {
  console.log('Connected to coverage WebSocket server');
};

// 当收到WebSocket消息时触发
socket.onmessage = (event) => {
  console.log('Message from server:', event.data);
  if (JSON.parse(event.data).type === 'getcoverage') {
    // 发送覆盖率数据
    socket.send(JSON.stringify((new Function('return this')()).__coverage__||{}));
  }
};

// 当WebSocket连接关闭时触发
socket.onclose = () => {
  console.log('Disconnected from coverage WebSocket server');
};


// 清理WebSocket连接
(new Function('return this')()).addEventListener('beforeunload', () => {
  socket.close();
});


