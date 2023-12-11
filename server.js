const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  }));

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  setInterval(() => {
    const sensorData = Math.floor(Math.random() * 1024);
    socket.emit('sensorData', sensorData);
  }, 1000);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(3001, () => {
  console.log('Servidor está ouvindo na porta 3001');
});