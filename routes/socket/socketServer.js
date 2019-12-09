const io = require('socket.io')({
    cookie: true
  })

  const init = server => {
    // io.use(({ request }, next) => {
    //   sessionMiddleware(request, request.res, next);
    // });
    io.attach(server);
  };

  let users = [{
      socketId: '',
      user: ''
  }]

 io.on('connection', socket => {
      console.log("Connected")
      const socketId = socket.id
      socket.on('join',room => {
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





  module.exports = {io, init};