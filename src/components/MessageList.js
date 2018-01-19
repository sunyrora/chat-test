import React, { Component } from 'react';
import Message from './Message';
import axios from 'axios';
import update from 'immutability-helper';
import { MESSAGE_API } from '../api';
import styles from './MessageList.css';
import { getLatestData, getOldData, getNewData } from '../data';
import { Events, scroller } from 'react-scroll';

const LOAD_LIMIT = 10;

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      loadOldMessage: false, // true: request old messages, false: request new Messages
      lastMessage: null,
    };

    this.fetchMessages = this.fetchMessages.bind(this);
    this.fetchOldMessages = this.fetchOldMessages.bind(this);
    this.addNewMessage = this.addNewMessage.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToWithContainer = this.scrollToWithContainer.bind(this);

    this.mapMessages = this.mapMessages.bind(this);
  }

  componentDidMount() {
    this.fetchMessages();

    //render 시 prop으로 onScroll 을 넘겨주어야 enzyme test에서 스파이 할 수 있다.
    // if(this.messagesList) {
    //   this.messagesList.addEventListener('scroll', this.handleScroll);
    // }

    Events.scrollEvent.register('begin', () => {
      // console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', () => {
      // console.log("end", arguments);
      this.setState({lastMessage: this.state.messages[0]});
    });
  }

  componentDidUpdate() {
    if(this.messagesList) {
      if(!this.state.loadOldMessage) {
        this.messagesList.scrollTop = this.messagesList.scrollHeight;
      } else {
        this.state.lastMessage && this.scrollToWithContainer(this.state.lastMessage.id.toString());
      }
    }
  }

  componentWillUnmount() {
    // if(this.messagesList) {
    //   this.messagesList.removeEventListener('scroll', this.handleScroll);
    // }
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.messages.length === nextState.messages.length) return false;
    return true;
  }

  scrollToWithContainer(to) {
    scroller.scrollTo(to, {
      duration: 300,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: 'messageList'
    });
  }

  handleScroll() {
    // console.log('handleScroll');
    if(this.messagesList.scrollTop <= 10) {
      this.fetchOldMessages();
    }
  }

  fetchMessages() {
    return axios.get(MESSAGE_API)
    .then(res =>{
      if(res.data && res.data.length > 0) {
        this.setState({
          messages: res.data,
          lastMessage: res.data[0],
        }); 
      }
    })
    .catch(error => {
      console.log('Call getLastesData ',error.stack);
      // for test when there is no server
      
      const data = getLatestData(LOAD_LIMIT);
      if(data && data.length > 0) {
        this.setState({
          messages: data,
          lastMessage: data[0],
        }); 
      }
    });
  }

  fetchOldMessages() {
    this.setState({loadOldMessage: true});

    return axios.get('someAPI')
    .then(res => {
      this.setState(({messages})=>({
        messages: update(messages, {$unshift: res.data})
      }));
    })
    .catch(error => {
      console.log(error.stack);
      // for test when there is no server

      let data;
      if(this.state.messages.length <= 0) {
        data = getLatestData(LOAD_LIMIT);
      } else {
        data = getOldData(this.state.messages[0].id, LOAD_LIMIT);
      }

      if(data) {
        this.setState(({messages})=>({
            messages: update(messages, {$unshift: data}),
        }));
      }
    });
  }

  fetchNewMessages() {
    this.setState({loadOldMessage: false});

    return axios.get('someAPI')
    .then(res => {
      this.setState(({messages})=>({
        messages: update(messages, {$push: res.data})
      }));
    })
    .catch(error => {
      console.log(error.stack);
      // for test when there is no server

      let data;
      if(this.state.messages.length <= 0) {
        data = getLatestData(LOAD_LIMIT);
      } else {
        data = getNewData(this.state.messages[this.state.messages.length-1].id, LOAD_LIMIT);
      }

      this.setState(({messages})=>({
          messages: update(messages, {$push: data}),
      }));
    });
  }

  addNewMessage(message) {
    this.setState(({messages, loadOldMessage}) => ({
        messages: update(this.state.messages, { 
          $push: [message]
        }),
        loadOldMessage: false,
    }));
  }

  mapMessages(data) {
    if(!data) return null;

    return data.map((message, i)=>{
      return (
        <Message
          className='message'
          key={message.id}
          text={message.text}
          isPublic={message.isPublic}
          name={message.id.toString()}
          id={message.id.toString()}
        />
      );
    });
  };

  render() {
    return (
      <div 
        className={styles.mainContainer}
        ref={c=>{this.messagesList = c}}
        id='messageList'
        onScroll={this.handleScroll}
        name='messageList'
      >
        {this.mapMessages(this.state.messages)}
      </div>
    );
  }
}

export default MessageList;