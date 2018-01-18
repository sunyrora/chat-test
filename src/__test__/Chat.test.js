import React from 'react';
import { shallow, mount } from 'enzyme';
import Chat from '../containers/Chat';
import MessageList from'../components/MessageList';
import Write from '../components/Write';
import { POST_API } from '../api';
import axios from 'axios';
import moxios from 'moxios';


describe('<Chat />', () => {
  let comp;
  let spy;
  let id = 5000;

  const createSpy = name => jest.spyOn(Chat.prototype, name);

  const compShallow = (disableLifecycleMethods=false) => {
    if(!comp) {
      comp = shallow(<Chat />, { disableLifecycleMethods });
    }
    return comp;
  };

  const compMount = () => {
    if(!comp) {
      comp = mount(<Chat />);
    }
    return comp;
  };

  beforeEach(() => {
    comp = undefined;
    moxios.install();
  });

  afterEach(() => {
    if(spy) {
      spy.mockReset();
      spy.mockRestore();
    }
    moxios.uninstall();
  });

  it('should render without issues', () => {
    const component = compShallow();
    expect(component.length).toBe(1);
  });

  describe('Render all components', () => {
    const component = compShallow();
    it('should render MessageList component', () => {
      expect(component.find(MessageList)).toHaveLength(1);
    });
    it('should render Write component', () => {      
      expect(component.find(Write)).toHaveLength(1);
    });
  });
  
  it('should pass sendMessage prop to Write component', () => {
    const component = compShallow();
    expect(component.find(Write).prop('sendMessage')).toBe(component.instance().sendMessage);
  });

  describe('button clicked from Write Message', () => {
    it('should call sendMessage method', (done) => {
      spy = createSpy('sendMessage');
      const component = compMount();          
      const write = component.find(Write);
      const message = {
        text: 'Test for Click event calls sendMessage method', 
        isPublic: true,
      };
      write.find('button').simulate('click');
      
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { ...message, id: id++},
        })
        .then((res) => {
          expect(spy).toHaveBeenCalled();
          done();
        })
      });
    });
  });

  describe('sendMessage method', () => {
    it('calls messageList.addNewMessage method', (done) => {
      spy = jest.spyOn(MessageList.prototype, 'addNewMessage');
      const component = compMount();
      const sendMessage = component.instance().sendMessage;
      const message = {
        text: `Test for call messageList.addNewMessage method
        multiline string 
        multi multi
        `, 
        isPublic: false,
      };
      const response = {
        ...message,
        id: id++
      };
      sendMessage(message);
           
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: response,
        })
        .then((res) => {
          expect(spy).toHaveBeenCalled();
          expect(spy).toHaveBeenCalledWith(response);
          done();
        })
        .catch(error => {
          console.log(error.stack);
        });
      });
    });
  });
});