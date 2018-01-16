import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckBox from './CheckBox';

class Write extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.send = this.send.bind(this);
    this.createMessageData = this.createMessageData.bind(this);
  }

  componentDidMount() {
  }

  handleFocus(event) {
    console.log("handleFocus", event);
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSendMessage(event) {
    this.sendMessage();
  }

  // doesn't do anything for now.
  send(message) {
    console.log("send: ", message);
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
    
    send(this.createMessageData(this.state.message, this.checkPublic.getState().isChecked));

    this.setState({message: ''});
    if(this.inputMessage) this.inputMessage.focus();    
  }

  render() {
    return (
      <div >
        <textarea
          placeholder='Write down your message'
          name='message'
          value={this.state.message}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          ref={c=>{this.inputMessage=c}}
          autoFocus
        />
        <button onClick={this.handleSendMessage}>Send</button>
        <CheckBox
          label="public"
          ref={c=>{this.checkPublic=c}}
        />
      </div>
    );
  }
}

Write.propTypes = {
  sendMessage: PropTypes.func,
};

export default Write;