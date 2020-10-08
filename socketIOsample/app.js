
const path = require('path');
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// 8080番ポート
const server = app.listen(8080, () => {
    console.log('Running at Port 8080...');
});
  
// その他のリクエストに対する404エラー
app.use((req, res) => {
    res.sendStatus(404);
});

console.log("My Socket server is running");

// socket
const socket = require('socket.io');
const io = socket(server);

// connection event
io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('sucess connect!');
    console.log(socket.id);
}

