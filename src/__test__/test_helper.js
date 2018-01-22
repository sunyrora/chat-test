import React from 'react';
import { shallow, mount } from 'enzyme';



export const renderShallow = (Component, disableLifecycleMethods=false, props = {}, state = {}) => {
  return shallow(<Component {...props} />, { disableLifecycleMethods });
}

export const renderMount = (ComponentClass, props = {}, state = {}) => {
  return mount(<ComponentClass {...props} />);
}

export const createSpy = (Component, name) => jest.spyOn(Component.prototype, name);
export const clearSpy = (spy) => {
  if(spy) {
    spy.mockReset();
    spy.mockRestore();
  };
}