const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const routes = require('./routes');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/socket-todo-chat", 
    {useNewUrlParser: true}
);

app.use('/', routes);
require('./sockets/todo-sockets')(io);

server.listen(PORT , () => {
    console.log(`🌎 Your SocketIO To Do Chat is up on PORT ${PORT}!`)
})