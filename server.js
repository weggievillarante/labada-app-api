const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const apiRouter = require('./routes/orderRoutes');

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.emit('message', 'Welcome to labada');

    socket.on('disconnect', () => {
        io.emit('message', 'user disconnected.');
        console.log('user disconnected');
    });
  });

app.use(express.json());
app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening at port ${port}...`));