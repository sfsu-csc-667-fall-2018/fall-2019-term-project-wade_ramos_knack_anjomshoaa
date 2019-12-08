const io = require('socket.io')(3002,{
    cookie: true
  })


 io.on('connection', socket => {
      console.log("Connected")
      socket.join('lobby')

      socket.on('income-msg',({msg,user}) => {
        
        console.log(msg)
        console.log(user)
        io.to('lobby').emit('chat',{incomeMsg: msg, user:user})
    })  



  })

  //Chat 





  module.exports = io;