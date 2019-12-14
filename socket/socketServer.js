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

    socket.on('income-msg',({msg,user}) => {
        
        console.log(msg)
        console.log(user)
        users.push({socketId,user})
        //console.log(users)
        io.to('lobby').emit('chat',{incomeMsg: msg, user:user})
    })  

    socket.on('disconnect', () => {
        console.log('Disconnected')
       
        
    })

    socket.on('leaveRoom', (uuid) => {
       console.log('Left Room: ', uuid);
       socket.leave(uuid);
    })

  })

  //Chat 

  module.exports = io;