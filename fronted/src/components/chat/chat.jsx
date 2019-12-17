import React, { Component } from 'react';
import ChatMsg from './msg'
import './chat.css'
import userStore from '../../redux/userStore'
import io from 'socket.io-client';


const socket = io();




class ChatBox extends Component {
    
    constructor(props){
        let messages = [];
        console.log("Props", props.chatClass)
        
        super(props);

        this.state = {
            chatMsgs: messages,
            userMessage: '',
            income: 0,
            path: '',
            perPath: '',
            chatclass: props.chatClass
        }
       this.chat = 'none';
    }

   

    //SW - this is where the new message component get created, you will be able to update the username and msg property 
    //to alter the chatMsg component
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.userMessage.length !== 0)
        {
            socket.emit('income-msg',{msg: this.state.userMessage, user: userStore.getState().username, path: window.location.pathname});
            this.setState({
                userMessage: ''
            });
        }
    }
    
    //SW - this function updated the userMessage when the form get updated 
    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            userMessage: event.target.value
        });
        //console.log(this.state.userMessage)
    }

    componentDidMount() {
        this.chat = document.getElementById('chat');
        console.log(window.location.href)
        console.log(window.location.pathname)
        if(window.location.pathname === '/gameslobby'){
         
    
        socket.emit('join',window.location.pathname)
        }else{
            
        socket.emit('leaveRoom', ({path: '/gameslobby'}))    
        socket.emit('join',window.location.pathname)    
        }
    }

    componentDidUpdate() {
       
        if(this.chat.scrollHeight !== null)
        {
            this.chat.scrollTop = this.chat.scrollHeight;
        }
        
    }

    componentWillMount(){
        socket.on('chat',({incomeMsg, user})=>{
            this.state.chatMsgs.push(<ChatMsg username={user.charAt(0).toUpperCase() + user.slice(1)} msg={incomeMsg}></ChatMsg>);
            this.setState({
                income: 1
            });
        })
    }

  

    render() { 
        if(this.state.chatclass === 'lobby'){
            
            return (
                <div  className='wrapper'>
                    <div className='content'>
                        <div id='chat-container'>
                            <div id='chat'>
                                {this.state.chatMsgs}
                            </div>
                            <form id='chatForm' onSubmit={this.handleSubmit} autoComplete='off'>
                                <input type='text' className='chat-input'placeholder='message' message='userMessage' value={this.state.userMessage} onChange={this.handleInputChange} ></input>
                            </form>
                            {this.state.chatMsgs}
                        </div>
                        
                    </div>  
                </div>
                
                );
        } else {
        
        return (
        <div  className='wrapper1'>
            <div className='content1'>
                <div id='chat-container1'>
                    <div id='chat'>
                        {this.state.chatMsgs}
                    </div>
                    <form id='chatForm' onSubmit={this.handleSubmit} autoComplete='off'>
                        <input type='text' className='chat-input1'placeholder='message' message='userMessage' value={this.state.userMessage} onChange={this.handleInputChange} ></input>
                    </form>
                    {this.state.chatMsgs}
                </div>
                
            </div>  
        </div>
        
        );
    }}
}

 
export default ChatBox;


export function leaveRoom(){

    socket.emit('leaveRoom', ({path: window.location.pathname }))

}

