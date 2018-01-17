import React from 'react';
import { shallow, mount } from 'enzyme';
import Write from '../components/Write';
import CheckBox from '../components/CheckBox';

describe('<Write />', () => {
  let props;
  let comp;
  let spy;
  let message;

  const createSpy = name => jest.spyOn(Write.prototype, name);

  const compShallow = (disableLifecycleMethods=false) => {
    if(!comp) {
      comp = shallow(<Write {...props} />, { disableLifecycleMethods });
    }
    return comp;
  };

  const compMount = () => {
    if(!comp) {
      comp = mount(<Write {...props} />);
    }
    return comp;
  };

  beforeEach(() => {
    props = {
      sendMessage: jest.fn(),
    };

    message = `Message event change test
    multiline
    string
    `;
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

  describe('Render all componets', () => {
    const component = compShallow();
    it('should render textarea', () => {      
      expect(component.find('textarea')).toHaveLength(1);
    });
  
    it('should render button', () => {
      expect(component.find('button')).toHaveLength(1);
    });

    it('should render CheckBox', () => {
      expect(component.find(CheckBox)).toHaveLength(1);
    });
  });

  describe('textarea', () => {
    const component = compShallow();
    beforeEach(() => {
      component.find('textarea').simulate('change', {
        target: { name: 'message', value: message}
      });
    });

    it('updates the value of state.message', () => {
      expect(component.state('message')).toEqual(message);
    });

    it('update the value of the textarea', () => {
      expect(component.find('textarea').prop('value')).toEqual(message);
    });
  });

  describe('button clicked', () => {
    it('fires handleSendMessage event', () => {
      spy = createSpy('handleSendMessage');
      const component = compMount();
      component.find('button').simulate('click');
      
      expect(spy).toHaveBeenCalled();
    });

    it('createMessageData function works well', () => {
      const data = {
        text: message,
        isPublic: true,
      };
      const component = compShallow();
      const res = component.instance().createMessageData(data.text, data.isPublic);
      expect(res).toEqual(data);
    });

    describe('sendMessage prop is defined', () => {
      let component;
      let data;
      beforeEach(() => {
        props.sendMessage = jest.fn(msg => { console.log('sendMessage mock func: message: ', msg); });
        component = compMount();
        //to change the value of state.message
        component.find('textarea').simulate('change', {
          target: { name: 'message', value: message}
        });

        data = {
          text: component.state('message'),
          isPublic: component.instance().checkPublic.getState().isChecked,
        };
        component.find('button').simulate('click');
      });

      it('calls sendMessage function passed from parent', () => {
        expect(component.prop('sendMessage')).toHaveBeenCalled();
        expect(component.prop('sendMessage')).toHaveBeenCalledWith(data);
      });
    });

    describe('sendMessage prop is not defined', () => {
      it('calls its own send method', () => {
        props.sendMessage = undefined;
        spy = createSpy('send');
        const component = compMount();
        component.find('button').simulate('click');
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('Reset value', () => {
      let component;
      beforeEach(() => {
        component = compMount();
        component.find('button').simulate('click');
      });

      it('clears the value of state.message', () => {        
        expect(component.state('message')).toEqual('');
      });
  
      it('clears the value of the textarea', () => {
        expect(component.find('textarea').prop('value')).toEqual('');
      });
    });
  });

});