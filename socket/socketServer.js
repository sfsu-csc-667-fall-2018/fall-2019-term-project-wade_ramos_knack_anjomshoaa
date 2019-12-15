const socket = require('socket.io');
const io = socket(); 

//const chat = io.of('/chat')

  let users = [{
      socketId: '',
      user: ''
  }]

 io.on('connection', socket => {
      console.log("Incoming Socket Request on: ", socket.id)
      //console.log("Connected")
      //adding a comment
      const socketId = socket.id

    socket.on('join',room => {
        //   console.log("Joined Room: " + room)
          socket.join(room)
    })

    socket.on('income-msg',({msg,user,path}) => {
        users.push({socketId,user})
        io.to(path).emit('chat',{incomeMsg: msg, user:user})
    })  

    socket.on('leaveRoom', ({path}) => {
        // console.log('Left Room: ', path);
        socket.leave(path);
     })

    socket.on('disconnect', () => {
        socket.disconnect(  )
        console.log('Disconnected')
    })

   

  })

  module.exports = io;