import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

const messages = []

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('send_message', (data) => {
        messages.push(data)
        io.emit('receive_message', data);
    });

    socket.on('request_all_messages', () => {
        io.to(socket.id).emit('receive_all_messages', messages);
    });
});

server.listen(9000, () => {
    console.log('Server is running on port 9000');
});
