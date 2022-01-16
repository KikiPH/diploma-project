
const io = require('socket.io')(3000, {
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    // sends username of new connection to admin
    socket.on('user-joined', (name, socketId) => {
        socket.to(socketId).emit('get-user-joined', name);
    });

    // sends quiz from admin to all participants
    socket.on('send-quiz', (quiz, socketIds) => {
        for (let socketId of socketIds) {
            socket.to(socketId).emit('get-quiz', quiz);
        }
    })
});