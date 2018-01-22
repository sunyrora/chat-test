import React from 'react';
import {
  renderMount,
  renderShallow,
  createSpy,
  clearSpy
} from './test_helper.js';
import Message from '../components/Message';

describe("<Message />", () => {
  let props;
  let spy;

  const shallow = (disableLifecycleMethods=false, state) => renderShallow(Message, disableLifecycleMethods, props, state);
  const mount = (state) =>renderMount(Message, props, state);
  const spyOn = (name) => createSpy(Message, name);


  // let comp;
  // const compShallow = () => {
  //   if(!comp) {
  //     comp = shallow(
  //       <Message {...props} />
  //     );
  //   }
  //   return comp;
  // };

  // const compMount = () => {
  //   if(!comp) {
  //     comp = mount(
  //       <Message {...props} />
  //     );
  //   }
  //   return comp;
  // };

  beforeEach(() => {
    props = {
      text: 'Message Test',
      isPublic: undefined,
    };
  });

  afterEach(() => {
    if(spy) {
      clearSpy(spy);
      spy = undefined;
    }
  });

  it('should render without issues', () => {
    const component = shallow();
    expect(component.length).toBe(1);
  });

  it('prints text prop', () => {
    const component = mount();
    const searched =  component.containsAnyMatchingElements([
      <div>Message Test</div>
    ]);
    expect(searched).toEqual(true);
  });

  describe('isPublic prop is true', () => {
    beforeEach(() => {
      props.isPublic = true;
    });

    it('should print "public"', () => {
      const component = mount();
      const searched =  component.containsAnyMatchingElements([
        <div>public</div>
      ]);
      expect(searched).toEqual(true);
    });
  });

  describe('isPublic prop is undefined (ou false)', () => {
    beforeEach(() => {
      props.isPublic = undefined;
    });

    it('should print "private"', () => {
      const component = mount();
      const searched =  component.containsAnyMatchingElements([
        <div>private</div>
      ]);
      expect(searched).toEqual(true);
    });
  });
});