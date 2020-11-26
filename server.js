const express       = require('express');
const path          = require('path');
const http          = require('http');
const socketio      = require('socket.io');
const messageFormat = require('./utils/messages');
const {
    joinUser, getUser, leaveUser, getRoomusers
} = require('./utils/users');

const PORT      = 3000 || process.env.PORT;
const BOT_NAME  = 'Chat App';
const app       = express();
const server    = http.createServer(app);
const io        = socketio(server);

io.on('connection', socket => {
    // console.log(`new WS connected`);
    // on user join room
    socket.on('joinRoom', ({username, room}) => {
        var user    = joinUser(socket.id, username, room);        

        // join spesefic rool
        socket.join(user.room);

        // send room name and users to joined uers
        io.to(user.room).emit('roomInfo', {
           roomName : user.room,
           roomUsers : getRoomusers(user.room)
        });

        // welcome for current user
        socket.emit('message', messageFormat(BOT_NAME, `welcome ${user.username} to chat app`));
    
        // broadcast [all users except the current one]
        socket.broadcast.to(user.room).emit('message', messageFormat(BOT_NAME, `${user.username} has joined the chat`));
    });
    
    // listen to chatMessage
    socket.on('chatMessage', (message) => {
        var user    = getUser(socket.id);
        io.to(user.room).emit('message', messageFormat(user.username, message));
        // console.log(message);
    });

    // on disconnect
    socket.on('disconnect', () => {
        // get leave user
        var user    = leaveUser(socket.id);
        if(user){
            // inform room users that a user left
            io.to(user.room).emit('message', messageFormat(BOT_NAME, `${user.username} has left the chat`));
            
            // send room name and users to joined uers
            io.to(user.room).emit('roomInfo', {
                roomName : user.room,
                roomUsers : getRoomusers(user.room)
             });
        }
    });
});

// static
app.use(express.static(path.join(__dirname, 'public')));
server.listen(PORT, () => console.log(`server running on port ${PORT}`));