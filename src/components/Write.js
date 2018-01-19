import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckBox from './CheckBox';
import styles from './Write.css';

class Write extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };

    this.components = undefined;

    this.handleChange = this.handleChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.send = this.send.bind(this);
    this.createMessageData = this.createMessageData.bind(this);
  }

  componentDidMount() {
    if(!this.components) {
      this.components = {
        inputMessage: this.inputMessage,
        btnSend: this.btnSend,
        checkPublic: this.checkPublic.checkContainer,
      };
    }

    if(this.components['inputMessage']) {
      this.components['inputMessage'].focus();
    }
  }

  focusNext = (event) => {
    const activeElement = this.container.querySelector(':focus');
    if(activeElement === null) {
      this.components['inputMessage'].focus();
    } else {
      let length = Object.keys(this.components).length;
      let tabIndex = activeElement.tabIndex % length + 1;
      if(event.shiftKey) {
        tabIndex = activeElement.tabIndex - 1;
        if(tabIndex <= 0) tabIndex = length;
      }
      const values = Object.values(this.components);
      const next = values.find(element => {
        return element.tabIndex === tabIndex;
      });

      if(next) {
        next.focus();
      }
    }
  }

  handleKeyDown(event) {
    if(event.key === 'Tab') {
      event.preventDefault();
      this.focusNext(event);
    } 
  }

  handleChange (event) {
    this.setState({message: event.target.value});
  }

  handleSendMessage (event) {
    this.sendMessage();
  }

  // doesn't do anything for now.
  send(message) {
    // console.log("send: ", message);
  }

  createMessageData(text, isPublic) {
    return {
      text,
      isPublic,
    };
  }

  sendMessage() {
    let send;
    this.props.sendMessage ?  send = this.props.sendMessage : send = this.send;
    
    send(this.createMessageData(this.state.message, this.checkPublic.getChecked()));

    this.setState({message: ''});
    if(this.components['inputMessage']) this.components['inputMessage'].focus();    
  }

  render() {
    return (
      <div 
        className={styles.writeContainer} 
        ref={c => this.container = c} 
        onKeyDown={this.handleKeyDown}
      >
        <textarea
          className={styles.textInput}
          placeholder='Write down your message'
          name='message'
          value={this.state.message}
          onChange={this.handleChange}
          ref={c=>{this.inputMessage=c}}
          tabIndex='1'
        />
        <button 
          name='btnSend' 
          onClick={this.handleSendMessage}
          ref={c=>{this.btnSend=c}}
          tabIndex='2'
        >
        Send
        </button>
          <CheckBox
            value="public"
            ref={c=>this.checkPublic=c}
            name='checkPublic'
            id='checkPublic'
            className={styles.checkBox}
            tabIndex='3'
          />
      </div>
    );
  }
}

Write.propTypes = {
  sendMessage: PropTypes.func,
};

export default Write;