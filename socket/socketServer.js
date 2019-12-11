const socket = require('socket.io');
const io = socket();  

  let users = [{
      socketId: '',
      user: ''
  }]


 io.on('connection', socket => {
      console.log("Connected")
      const socketId = socket.id
      socket.on('join',room => {
          console.log("Joined Room : " + room)
          socket.join(room)
      })

      socket.on('income-msg',({msg,user}) => {
        
        console.log(msg)
        console.log(user)
        users.push({socketId,user})
        
        io.to('lobby').emit('chat',{incomeMsg: msg, user:user})
    })  
    console.log(users)

    socket.on('disconnect', () => {
        console.log('Disconnected')
        users.forEach(user => {
            if(user.socketId === socket.id){
                users.splice(users.indexOf(user),1)
            }
        })
        console.log(users)
    })



  })

  //Chat 





  module.exports = io;