import React from 'react';
import { shallow, mount } from 'enzyme';
import MessageList from '../components/MessageList';
import Message from '../components/Message';
import moxios from 'moxios'

describe('<MessageList />', () => {
  const messages = [
    { id: 0, text: `Test for call messageList.addNewMessage method
    multiline string 
    multi multi
    `, isPublic: true },
    { id: 1, text: 'Message 1', isPublic: false },
    { id: 2, text: 'Message 2', isPublic: true },
  ];

  let spy;
  const createSpy = name => jest.spyOn(MessageList.prototype, name);

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
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall()

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
    component.instance().fetchMessages = jest.fn(); // avoid network ruquest
    component.setState({messages});

    it('should render Message component if state.message.length > 0', () => {      
      expect(component.state('messages').length).toBe(messages.length);
      expect(component.find(Message)).toHaveLength(messages.length);          
    });    
  });
  
  describe('componentDidMount', () => {

    it('calls fetchMessages', () => {
      spy = createSpy('fetchMessages');
      const component = compShallow(true);
      component.instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
    });

    it('should update the state', async (done) => {
      const component = compShallow();
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: messages,
        })
        .then(res => {
          component.state('messages').forEach((element, index) => {
            expect(element.text).toEqual(messages[index].text);
            expect(element.isPublic).toEqual(messages[index].isPublic);
          });
          expect(component.state('loadOldMessage')).toEqual(false);

          done();
        })
        .catch(error => {
          console.log(error.stack);
        });
      });
      
    });
  });

  describe('addNewMessage method', () => {
    let component;
    let addNewMessage;
    beforeEach(() => {
      component = compShallow(false);  
      addNewMessage = component.instance().addNewMessage;
      addNewMessage(messages[0]);
    });

    it('push a message to state.messages when addNewMessage is called', () => {      
      const added = component.state('messages')[component.state('messages').length-1];
      expect(added).toEqual(messages[0]);
    });
    
    it('renders one more Message component with passed text', () => {
      expect(component.find(Message)).toHaveLength(component.state('messages').length);
    });
  });

  describe('scroll event', () => {
    it('fires handleScroll event', () => {
      spy = createSpy('handleScroll');
      const component = compMount();
      const messageList = component.find({name: 'messageList'});
      messageList.simulate('scroll');
      expect(spy).toHaveBeenCalled();      
    });   
    
    describe('When scroll is on top', () => {
      it('calls fetchOldMessages', () => {
        spy = createSpy('fetchOldMessages');
        const component = compMount();
        const messageList = component.find({name: 'messageList'});
        // no data so scrollTop is 0
        messageList.simulate('scroll');
        expect(spy).toHaveBeenCalled();
      });
    });

    // nett to find how to simulate scrollToBottom event
    xdescribe('When scroll is on bottom', () => {
      it('calls fetchNewMessages', () => {
        spy = createSpy('fetchNewMessages');
        const component = compMount();
        const messageList = component.find({name: 'messageList'});
        
        expect(spy).toHaveBeenCalled();
      });
    });

  });

});