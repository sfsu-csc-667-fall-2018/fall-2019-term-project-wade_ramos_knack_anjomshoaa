// import React, {useState, useEffect} from 'react'
// import io from 'socket.io-client';

// const socket = io('http://localhost:3006')

// let message;
// let names;

// const onChange = (event) => {
//     console.log(event.target.name)
//     console.log(event.target.value)
//     message = event.target.value
// }

// //On accepts
// //Emit Sends


// const name = (e) => {
//     names = e.target.value
// }




// const GamesLobby = () => {
//     const [msg, setMsg] = useState()
//     const onSubmit = (event) => {
//         event.preventDefault();
//         socket.emit('chatMessage', message)
        
//     }
//     useEffect(() => {
//         console.log('Hello')
//         socket.on('chat',(msg)=>{
//             setMsg(msg)
//             console.log("Recieved:" + msg)
//         })
//       }, [msg])
//     const income = <h1>Incoming Message : {msg}</h1>
    

//   return (
//     <div>
//       <h2>Chats Lobby</h2>

//     <ul id="messages"></ul>
//     <form action=""  onSubmit={onSubmit}>
//       <input onChange={name} name= "name" />  
//       <input onChange={onChange} id="m" autocomplete="off" name="message" /><button>Send</button>
//     </form>
//     {msg ? income : ''}
//     </div>
    
//   )
// }

// export default GamesLobby