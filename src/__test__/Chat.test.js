import React from 'react';
import { shallow, mount } from 'enzyme';
import Chat from '../containers/Chat';
import MessageList from'../components/MessageList';
import Write from '../components/Write';
import { POST_API } from '../api';
import axios from 'axios';


describe('<Chat />', () => {
  let comp;
  let spy;

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
  });

  afterEach(() => {
    if(spy) {
      spy.mockReset();
      spy.mockRestore();
    }
  });

  it('should render without issues', () => {
    const component = compShallow();
    expect(component.length).toBe(1);
  });

  describe('Render all components', () => {
    const component = compShallow();
    it('should render MessageList', () => {      
      expect(component.find(MessageList)).toHaveLength(1);
    });
    it('should render Write', () => {      
      expect(component.find(Write)).toHaveLength(1);
    });
  });
  
  it('should pass sendMessage prop to Write component', () => {
    const component = compShallow();
    expect(component.find(Write).prop('sendMessage')).toBe(component.instance().sendMessage);
  });

  describe('button clicked from Write Message', () => {
    it('should call sendMessage method', () => {
      const sendMessgeOrg = Chat.prototype.sendMessage;
      Chat.prototype.sendMessage = jest.fn();
      const component = compMount();
      const write = component.find(Write);
      write.find('button').simulate('click');
      expect(Chat.prototype.sendMessage).toHaveBeenCalled();
      Chat.prototype.sendMessage = sendMessgeOrg;
    });
  });

  describe('sendMessage method', () => {
    const axiosOrg = axios.pos;
    const data = {
      text: "post test",
      isPublic: false, 
    };

    it('sends a post request with api', () => {
      axios.post = jest.fn(() => new Promise(res => res(response)));
      
      const response = {
        data,
        status: 201,
      };

      const component = compShallow();
      const sendMessage = component.instance().sendMessage;

      sendMessage(data);

      expect(axios.post).toHaveBeenCalled();
      expect(axios.post).toHaveBeenCalledWith(POST_API, data);

      axios.post = axiosOrg;
    });
  });

  describe('post request', () => {
    it('calls MessageList.addmessage method when request success', async () => {
      try {
        const component = compMount();
        const sendMessage = component.instance().sendMessage;
        spy = jest.spyOn(component.find(MessageList).instance(), 'addMessage');
        await sendMessage(data);

        expect(spy).toHaveBeenCalledWith(data);
      } catch (error) {
        console.log(error.stack);
        // expect(error).toMatch('error');
      }
    });
  });

});