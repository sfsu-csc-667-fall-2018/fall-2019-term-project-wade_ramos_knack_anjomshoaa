import React, { Component } from 'react';
import './msg.css'

class ChatMsg extends Component {
    constructor(props) {
        super(props);
        
        this.state = {}    
      }
      
    render() { 
        return (
        <div className='msgWrapper'>   
            <span id='name'>{this.props.username + ':'}</span>
            <div id='text'>
                {' ' + this.props.msg}
            </div>
        </div>
        );
    }
}
 
export default ChatMsg;