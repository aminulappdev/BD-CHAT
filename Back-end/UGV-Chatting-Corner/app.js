require('dotenv').config();
const config = require('./config/config');
const app = require('express')();
const User = require('./models/user.models');
const Chat = require('./models/chat.models');
const http = require('http').Server(app);

require('./config/db');



// Connect Database
// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://imran:imran12345@bd-chat.65qn5gx.mongodb.net/BdChat');
// mongoose.connect('mongodb://localhost:27017/chat-app');


// Router Setup
const userRouter = require('./routes/users.route')
app.use('/', userRouter);


// Socket Connect
const io = require('socket.io')(http);
var unsp = io.of('/user-namespace');

unsp.on('connection', async function (socket) {
    console.log('User connected');
    // var userID = socket.handshake.auth.token; // Fetch user id
    // await User.findByIdAndUpdate({_id : userID}, {$set : {is_online:'1'}}); // Change online status
    console.log(socket.handshake.auth.token)
    await User.findByIdAndUpdate({_id : socket.handshake.auth.token}, {$set : {is_online:'1'}}); // Change online status
    
    // user broadcast online status
    socket.broadcast.emit('getOnlineUser', {user_id: socket.handshake.auth.token});


    // Disconnect
    socket.on('disconnect', async function () {
        console.log('User disconnected');
        // var userID = socket.handshake.auth.token; // Fetch user id
        // await User.findByIdAndUpdate({_id : userID}, {$set : {is_online:'1'}}); // Change online status
        await User.findByIdAndUpdate({_id : socket.handshake.auth.token}, {$set : {is_online:'0'}}); // Change online status
    
        // user broadcast online status
        socket.broadcast.emit('getOfflineUser', {user_id: socket.handshake.auth.token});

    
    });
    
    // Chatting implementation
    socket.on('newChat', function(data){ // Fetch current user data from client side
        socket.broadcast.emit('loadNewChat',data); // Broadcast/post current user data into client side (jate kore ei data abar onno ekjon user dekhte pare)
    });

    // load old chat
    socket.on('existsChat', async function(data){
        // Fetch existing chat in specific user
        var chats = await Chat.find({ $or:[
            { sender_id:data.sender_id, receiver_id:data.receiver_id},
            { sender_id:data.receiver_id, receiver_id:data.sender_id},
        ]});

        socket.emit('loadChat',{chats:chats}) // Send existing chat in specific user
    })

    // Deleted chat
    socket.on('chatDeleted',function(id){
       socket.broadcast.emit('chatMessageDeleted', id);
    });

    // Group Chatting implementation
    socket.on('newGroupChat', function(data){ // Fetch current user data from client side
        socket.broadcast.emit('loadNewGroupChat',data); // Broadcast/post current user data into client side (jate kore ei data abar onno ekjon user dekhte pare)
    });

    // Delete group chat
    socket.on('groupChatDeleted', function(id){
        socket.broadcast.emit('GroupChatMessageDeleted',id); 
    });


});

module.exports = app;
