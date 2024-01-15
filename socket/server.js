const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

const PORT = 3001;

app.get('/', (req, res) => {
  res.send("hello world");
})

io.on('connection', (socket) => {
  console.log('connection')

  socket.on('customEvent', () => {
    console.log('customEvent')
  })

  socket.on('disconnect', () => {
    console.log('disconnect')
  })
})

server.listen(PORT, () => {
  console.log('listening on 3001')
})