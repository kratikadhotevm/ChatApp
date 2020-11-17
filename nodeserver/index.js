
// setups in server
// node server which will handle socket-io connections
const io = require('socket.io')(8000)

const users = {};
// console.log("HEY there??");
io.on('connection',socket =>{
    socket.on('new-user-joined',name =>{
       users[socket.id] = name;
    //    jisme join kia usko chhodkar sbko bta dega ki isne join kia
       socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message,
            name:users[socket.id]});
    });

    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id]
    });
})





