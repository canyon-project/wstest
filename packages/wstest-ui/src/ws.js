// 创建WebSocket连接
const socketCoverage = new WebSocket('ws://localhost:8080');

// 当WebSocket连接打开时触发
socketCoverage.onopen = () => {
  console.log('Connected to coverage WebSocket server');
};

// 当收到WebSocket消息时触发
socketCoverage.onmessage = (event) => {
  console.log('Message from server:', event.data);
  if (JSON.parse(event.data).type === 'getcoverage') {
    // 发送覆盖率数据

    console.log(JSON.stringify(window.__coverage__||{}))
    socketCoverage.send(JSON.stringify(window.__coverage__||{}));
  }
};

// 当WebSocket连接关闭时触发
socketCoverage.onclose = () => {
  console.log('Disconnected from coverage WebSocket server');
};


// 清理WebSocket连接
window.addEventListener('beforeunload', () => {
  socketCoverage.close();
});
