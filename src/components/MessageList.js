import React, { Component } from 'react';
import Message from './Message';
import axios from 'axios';
import update from 'immutability-helper';
import { MESSAGE_API } from '../api';
import styles from './MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    this.fetchMessages = this.fetchMessages.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages() {
    return axios.get(MESSAGE_API)
    .then((res) =>{
      // console.log("fetch result: ", res);
      this.setState({messages: res.data});
    })
    .catch((error) => {
      console.log(error.stack);
    });
  }

  addMessage(message) {
    console.log("add message: ", message);    
    this.setState(({messages}) => ({
        messages: update(this.state.messages, { 
          $push: [message]
        })
    }));
  }

  render() {
    let mapMessages = (data)=>{
      return data.map((message, i)=>{
        return (
          <Message
            key={message.id}
            text={message.text}
            isPublic={message.isPublic}
          />
        );
      });
    };

    return (
      <div className={styles.mainContainer}>
        {mapMessages(this.state.messages)}
      </div>
    );
  }
}

export default MessageList;