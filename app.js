var express = require('express');
var socket = require('socket.io');
//setting app
var app = express();


var server = app.listen(3000,function(){
    console.log(`Server Started on port 3000`);
}); 


//Static Files
app.use(express.static('public'));

//Socket setup 
var io = socket(server);

io.on('connection',function(socket){
    console.log('made socket connection'+socket.id);

    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
});

app.get('/',function(req,res){
    res.render('index');
});