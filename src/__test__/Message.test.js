import React from 'react';
import { shallow, mount } from 'enzyme';
import Message from '../components/Message';

describe("<Message />", () => {
  let props;
  let comp;
  const compShallow = () => {
    if(!comp) {
      comp = shallow(
        <Message {...props} />
      );
    }
    return comp;
  };

  const compMount = () => {
    if(!comp) {
      comp = mount(
        <Message {...props} />
      );
    }
    return comp;
  };

  beforeEach(() => {
    props = {
      text: 'Message Test',
      isPublic: undefined,
    };

    comp = undefined;
  });

  it('should render without issues', () => {
    const component = compShallow();
    expect(component.length).toBe(1);
  });

  it('prints text prop', () => {
    const component = compShallow();
    const divs = component.find('div');
    const searched = divs.findWhere(n => n.text() === props.text);
    expect(searched.exists()).toEqual(true);
  });

  describe('isPublic prop is true', () => {
    beforeEach(() => {
      props.isPublic = true;
    });

    it('should print "public"', () => {
      const component = compShallow();
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
      const component = compShallow();
      const divs = component.find('div');
      const searched = divs.findWhere(n => n.text() === 'private');
      expect(searched.exists()).toEqual(true);
    });
  });
});