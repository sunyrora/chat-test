import {
  renderMount,
  renderShallow,
  createSpy,
  clearSpy
} from './test_helper.js';
import CheckBox from '../components/CheckBox';

describe('<CheckBox />', () => {
  let props;
  let spy;

  const shallow = (disableLifecycleMethods=false, state) => renderShallow(CheckBox, disableLifecycleMethods, props, state);
  const mount = (state) =>renderMount(CheckBox, props, state);
  const spyOn = (name) => createSpy(CheckBox, name);

  beforeEach(() => {
    props = {
      value: 'public',
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

  it('should render <label />', () => {
    const component = shallow();
    expect(component.find('label')).toHaveLength(1);
  });

  it('should render <input /> type=checkbox', () => {
    const component = shallow();
    expect(component.find('[type="checkbox"]')).toHaveLength(1);
  });

  it("print value prop", () => {
    const component = shallow();
    expect(component.find('label').text()).toEqual(props.value);
  });

  describe('Chekbox toggle', () => {
    it('toggles state.isCheckd', () => {
      spy = spyOn('toggleCheckboxChange');
      const component = shallow();
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