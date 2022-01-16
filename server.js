
const io = require('socket.io')(3000, {
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    console.log(`User with id ${socket.id} connected`);

    socket.on('user-joined', id => {
        socket.broadcast.emit('get-user-joined', id);
    });

    socket.on('send-quiz', quiz => {
        socket.broadcast.emit('get-quiz', quiz);
    })
});