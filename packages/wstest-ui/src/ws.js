// 创建WebSocket连接
const socket = new WebSocket('ws://localhost:8080');

// 当WebSocket连接打开时触发
socket.onopen = () => {
  console.log('Connected to the WebSocket server');
};

// 当收到WebSocket消息时触发
socket.onmessage = (event) => {
  console.log('Message from server:', event.data);
  // 发送覆盖率数据
  socket.send('给你覆盖率数据');
};

// 当WebSocket连接关闭时触发
socket.onclose = () => {
  console.log('Disconnected from the WebSocket server');
};


// 清理WebSocket连接
window.addEventListener('beforeunload', () => {
  socket.close();
});
