import React, { Component } from 'react';
import MessageList from '../components/MessageList';
import Write from '../components/Write';
import axios from 'axios';
import styles from './Chat.css';

import { POST_API } from '../api';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
  }

  /**
   * 
   * @param {object} data - Message Object {text, isPublic}
   */
  sendMessage(data) {
    return axios.post(POST_API, data)
    .then(res => {
      // console.log("POST RESPONSE: ", res);
      if(this.messageList) {
        this.messageList.addNewMessage(res.data);
      }
    })
    .catch(error => {
      console.log(error.stack);
      if(this.messageList) {
        this.messageList.addNewMessage({ ...data, id: Math.random() });
      }
    })
  }

  render() {
    return (
      <div className={styles.chatContainer} >
        <MessageList 
          ref={(c)=>{this.messageList = c}}
        />
        <Write sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default Chat;