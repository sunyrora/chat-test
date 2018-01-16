import React from 'react';
import { shallow, mount } from 'enzyme';
import Write from '../components/Write';
import CheckBox from '../components/CheckBox';

describe('<Write />', () => {
  let props;
  let comp;
  let spy;

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
    const message = 'Message event change test';

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

    describe('sendMessage prop is defined', () => {      
      it('calls sendMessage function passed', () => {
        props.sendMessage = jest.fn(message => { console.log('sendMessage mock func: message: ', message); });
        const component = compMount();
        component.find('button').simulate('click');
        expect(component.prop('sendMessage')).toHaveBeenCalled();
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