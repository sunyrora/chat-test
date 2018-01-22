import {
  renderMount,
  renderShallow,
  createSpy,
  clearSpy
} from './test_helper.js';
import Write from '../components/Write';
import CheckBox from '../components/CheckBox';

describe('<Write />', () => {
  let props;
  let spy;
  let message;

  const shallow = (disableLifecycleMethods=false, props, state) => renderShallow(Write, disableLifecycleMethods, props, state);
  const mount = (props, state) =>renderMount(Write, props, state);
  const spyOn = (name) => createSpy(Write, name);

  beforeEach(() => {
    props = {
      sendMessage: jest.fn(),
    };

    message = `Message event change test
    multiline
    string
    `;
  });

  afterEach(() => {
    if(spy) {
      clearSpy(spy);
      spy = undefined;
    }
  });

  it('should render without issues', () => {
    const component = mount();
    expect(component.length).toBe(1);
  });

  describe('Render all componets', () => {
    const component = mount();
    it('should render textarea and set focus to the textarea', () => {  
      const textarea = component.find('textarea');
      const focused = document.activeElement;
      
      expect(textarea).toHaveLength(1);
      expect(textarea.matchesElement(focused)).toEqual(true);
    });
  
    it('should render button', () => {
      expect(component.find('button')).toHaveLength(1);
    });

    it('should render CheckBox', () => {
      expect(component.find(CheckBox)).toHaveLength(1);
    });
  });

  describe('textarea onChange', () => {
    const component = mount();
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

  describe('Send button clicked', () => {
    it('fires handleSendMessage event', () => {
      spy = spyOn('handleSendMessage');
      const component = mount();
      component.find('button').simulate('click');
      
      expect(spy).toHaveBeenCalled();
    });

    it('createMessageData function works well', () => {
      const data = {
        text: message,
        isPublic: true,
      };
      const component = mount();
      const res = component.instance().createMessageData(data.text, data.isPublic);
      expect(res).toEqual(data);
    });

    describe('sendMessage prop is defined', () => {
      let component;
      let data;
      beforeEach(() => {
        props.sendMessage = jest.fn(msg => { console.log('sendMessage mock func: message: ', msg); });
        component = mount(props);
        //to change the value of state.message
        component.find('textarea').simulate('change', {
          target: { name: 'message', value: message}
        });

        data = {
          text: component.state('message'),
          isPublic: component.instance().checkPublic.getChecked(),
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
        spy = spyOn('send');
        const component = mount();
        component.find('button').simulate('click');
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('Reset value', () => {
      let component;
      beforeEach(() => {
        component = mount();
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