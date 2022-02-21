
const io = require('socket.io')(3000, {
    cors: {
        origin: '*'
    }
});

rooms = {}; // {roomId: [admin, user1, user2, ...]}
users = {}; // {socket1: name1, socket2: name2, ...}

io.on('connection', socket => {
    
    // BASIC REQUESTS
    socket.on('start-room', (roomId) => {
        if (rooms[roomId]) {
            socket.emit('get-start-room', false);
        }
        else {
            socket.emit('get-start-room', true);
        }
    });

    socket.on('check-room', (roomId) => {
        if (rooms[roomId]) {
            socket.emit('get-check-room', true);
        }
        else {
            socket.emit('get-check-room', false);
        }
    });

    socket.on('join-room', (roomId, name) => {
        // guest connected to existing room
        if (rooms[roomId]) {
            rooms[roomId].push(socket.id);
        }
        // admin hosted a new room
        else {
            rooms[roomId] = [socket.id];
        }
        // save username
        users[String(socket.id)] = name;
    });

    // ADMIN REQUESTS
    // sends username of new connection to admin
    socket.on('user-connected', (roomId) => {
        let admin = rooms[roomId][0];
        socket.to(admin).emit('get-user-connected', users[socket.id]);
    });

    socket.on('user-disconnected', (roomId) => {
        // if room still exists
        if (rooms[roomId]) {
            let admin = rooms[roomId][0];
            socket.to(admin).emit('get-user-disconnected', users[socket.id]);

            // remove user from room
            rooms[roomId] = rooms[roomId].filter(user => user != socket.id);
            delete users[socket.id];
        }
    });

    // sends quiz from admin to all participants
    socket.on('send-quiz', (roomId, quiz) => {
        for (let socketId of getUsers(roomId)) {
            socket.to(socketId).emit('get-quiz', quiz);
        }
        
        socket.emit('get-quiz-status'); // for admins console
    });

    socket.on('send-pdf', (roomId, pdf) => {
        for (let socketId of getUsers(roomId)) {
            socket.to(socketId).emit('get-pdf', pdf);
        }

        socket.emit('get-pdf-status');
    });

    socket.on('send-image', (roomId, image) => {
        for (let socketId of getUsers(roomId)) {
            socket.to(socketId).emit('get-image', image);
        }
        
        socket.emit('get-image-status');
    });

    socket.on('stop-room', (roomId) => {
        delete rooms[roomId];
    });

    // GUEST REQUESTS
    socket.on('send-question', (roomId) => {
        let admin = rooms[roomId][0];
        socket.to(admin).emit('get-question', users[socket.id]);
    });

    socket.on('send-answers', (roomId, answers) => {
        let admin = rooms[roomId][0];
        socket.to(admin).emit('get-answers', users[socket.id], answers);
    });

    // PEER REQUESTS
    socket.on('fetch-users', (roomId) => {
        socket.emit('get-users', getUsers(roomId));
    });

    socket.on('start-stream', () => {
        socket.emit('get-start-stream');
    });

    socket.on('toggle-stream', (roomId, stream) => {
        for (let socketId of getUsers(roomId)) {
            socket.to(socketId).emit('get-toggle-stream');
        }

        socket.emit('get-stream-status', stream);
    });

    socket.on('stop-stream', (roomId) => {
        for (let socketId of getUsers(roomId)) {
            socket.to(socketId).emit('get-stop-stream');
        }

        socket.emit('get-stop-stream');
    });
});

// get all connected users in a room without the admin
function getUsers(roomId) {
    return rooms[roomId].slice(1);
};
