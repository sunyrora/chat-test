import React from 'react';
import { shallow, mount } from 'enzyme';
import CheckBox from '../components/CheckBox';

describe('<CheckBox />', () => {
  let props;
  let comp;
  const compShallow = (disableLifecycleMethods=false) => {
    if(!comp) {
      comp = shallow(<CheckBox {...props} />, { disableLifecycleMethods });
    }
    return comp;
  };

  const compMount = () => {
    if(!comp) {
      comp = mount(<CheckBox {...props} />);
    }
    return comp;
  };

  beforeEach(() => {
    props = {
      label: 'public',
    };

    comp = undefined;
  });

  it('should render without issues', () => {
    const component = compShallow();
    expect(component.length).toBe(1);
  });

  it('should render <label />', () => {
    const component = compShallow();
    expect(component.find('label')).toHaveLength(1);
  });

  it('should render <input /> type=checkbox', () => {
    const component = compShallow();
    expect(component.find('[type="checkbox"]')).toHaveLength(1);
  });

  it("print label prop", () => {
    const component = compShallow();
    expect(component.find('label').text()).toEqual(props.label);
  });

  describe('Chekbox toggle', () => {
    it('toggles state.isCheckd', () => {
      const spy = jest.spyOn(CheckBox.prototype, 'toggleCheckboxChange');
      const component = compShallow();
      const checkbox = component.find('[type="checkbox"]');
      let prev = checkbox.prop('checkd');
      checkbox.simulate('change');
      expect(spy).toHaveBeenCalled();
      expect(component.state('isChecked')).toEqual(!prev);
      // expect(checkbox.prop('checked')).toBe(!prev);

      spy.mockReset();
      spy.mockRestore();
    });
  })

});