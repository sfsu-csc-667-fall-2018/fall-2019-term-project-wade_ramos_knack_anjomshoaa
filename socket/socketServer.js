const socket = require('socket.io');
const io = socket();  

  let users = [{
      socketId: '',
      user: ''
  }]

 io.on('connection', socket => {
      console.log("Incoming Socket Request on: ", socket.id)
      const socketId = socket.id

    socket.on('join',room => {
          console.log("Joined Room: " + room)
          socket.join(room)
    })

    socket.on('income-msg',({msg,user,path}) => {
        users.push({socketId,user})
        io.to(path).emit('chat',{incomeMsg: msg, user:user})
    })  

    socket.on('leaveRoom', ({path}) => {
        console.log('Left Room: ', path);
        socket.leave(path);
     })

    socket.on('disconnect', () => {
        console.log('Disconnected')
    })

   

  })

  module.exports = io;