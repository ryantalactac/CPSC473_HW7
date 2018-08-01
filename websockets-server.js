var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;

var ws = new WebSocketServer({
  port: port
});

var messages = [];
var newConnectMsg = '*** Topic is ';
var currentTopic = 'Chatting about WebSockets';
var topicChange = '*** Topic has changed to ';
var command = '/topic';

console.log('websockets server started');

ws.on('connection', function(socket) {
  console.log('client connection established');

  socket.send(newConnectMsg + '\'' + currentTopic + '\'');
  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on('message', function(data) {
    console.log('message received: ' + data);
    if (data.substring(0, 6) == command) {
      currentTopic = data.replace(command + ' ', '');
      data = topicChange + '\'' + currentTopic + '\'';
    } else {
      messages.push(data);
    }
    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data);
    });
  });
});
