
const io = require('socket.io')(3000, {
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    // sends username of new connection to admin
    socket.on('user-connected', (name, socketId) => {
        socket.to(socketId).emit('get-user-connected', name);
    });

    socket.on('user-disconnected', (name, socketId) => {
        socket.to(socketId).emit('get-user-disconnected', name);
    });

    // sends quiz from admin to all participants
    socket.on('send-quiz', (quiz, socketIds) => {
        for (let socketId of socketIds) {
            socket.to(socketId).emit('get-quiz', quiz);
        }
    })

    socket.on('send-image', (image, socketIds) => {
        for (let socketId of socketIds) {
            socket.to(socketId).emit('get-image', image);
        }
    })

    socket.on('send-question', (name, socketId) => {
        socket.to(socketId).emit('get-question', name);
    });
});