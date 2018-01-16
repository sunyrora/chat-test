import React from 'react';
import { shallow, mount } from 'enzyme';
import MessageList from '../components/MessageList';
import Message from '../components/Message';
import axios from 'axios';
import { MESSAGE_API } from '../api';

describe('<MessageList />', () => {
  const messages = [
    { id: 0, text: "Message 0", isPublic: true },
    { id: 1, text: "Message 1", isPublic: false },
    { id: 2, text: "Message 2", isPublic: true },
  ];

  const response = {
    data: messages,
    status: 200,
  };

  axios.get = jest.fn(() => new Promise(res => res(response)));

  let comp;
  const compShallow = (disableLifecycleMethods=false) => {
    if(!comp) {
      comp = shallow(<MessageList />, { disableLifecycleMethods });
    }
    return comp;
  };

  const compMount = () => {
    if(!comp) {
      comp = mount(<MessageList />);
    }
    return comp;
  };

  beforeEach(() => {
    comp = undefined;
  });

  it('should render without issues', () => {
    const component = compShallow();
    expect(component.length).toBe(1);
  });

  xit('should render <Message /> component as mush as state.message.length', () =>{
    const component = compMount();
    component.setState(messages);

    // shallow doesn't find dumb component..
    expect(component.find(Message).length).toEqual(messages.length);
  });

  describe('componentDidMount', () => {    
    it('send request for get messages', () => {
      const component = compShallow();
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith(MESSAGE_API);
    });

    it('should update the state', async () => {
      const component = compShallow(true);
      const fetchMessages = component.instance().fetchMessages;
      await fetchMessages();
      component.state('messages').forEach((element, index) => {
        expect(element.text).toEqual(messages[index].text);
        expect(element.isPublic).toEqual(messages[index].isPublic);
      });
    });
  });
  
  it('push a message to the state when addMessage is called', () => {
    const component = compShallow(true);
    const addMessage = component.instance().addMessage;
    addMessage(messages[0]);
    const added = component.state('messages');
    expect(added[added.length-1]).toEqual(messages[0]);
  });

});