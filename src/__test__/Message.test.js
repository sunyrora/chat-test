import React from 'react';
import { shallow, mount } from 'enzyme';
import Message from '../components/Message';

describe("<Message />", () => {
  let props;
  let message;
  const msgShallow = () => {
    if(!message) {
      message = shallow(
        <Message {...props} />
      );
    }
    return message;
  };

  const msgMount = () => {
    if(!message) {
      message = mount(
        <Message {...props} />
      );
    }
    return message;
  };

  beforeEach(() => {
    props = {
      text: 'Message Test',
      isPublic: undefined,
    };

    message = undefined;
  });

  it('should render without issues', () => {
    const component = msgShallow();
    expect(component.length).toBe(1);
  });

  it('prints text prop', () => {
    const component = msgShallow();
    const divs = component.find('div');
    const searched = divs.findWhere(n => n.text() === props.text);
    expect(searched.exists()).toEqual(true);
  });

  describe('isPublic prop is true', () => {
    beforeEach(() => {
      props.isPublic = true;
    });

    it('should print "public"', () => {
      const component = msgShallow();
      const divs = component.find('div');
      const searched = divs.findWhere(n => n.text() === 'public');
      expect(searched.exists()).toEqual(true);
    });
  });

  describe('isPublic prop is undefined (ou false)', () => {
    beforeEach(() => {
      props.isPublic = undefined;
    });

    it('should print "private"', () => {
      const component = msgShallow();
      const divs = component.find('div');
      const searched = divs.findWhere(n => n.text() === 'private');
      expect(searched.exists()).toEqual(true);
    });
  });
});