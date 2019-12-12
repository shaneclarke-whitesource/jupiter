import { renderWithForm, mountWithProvider } from '../../../../test/provider';
import { StateSelect } from './StateSelect';

describe('StateSelect', () => {
  let wrapper;
  const onChangeMock = jest.fn();
  const defaultProps = {
    country: 'US',
    label: 'Colorado',
    setRegion: onChangeMock,
    region: '',
    input: {
      name: 'state'
    }
  };
  beforeEach(() => {
    wrapper = mountWithProvider(StateSelect, defaultProps);
  });

  test('it renders', () => {
    const component = renderWithForm(StateSelect, defaultProps).toJSON();
    expect(component).toMatchSnapshot();
  });

  test('it renders the label according to the label prop', () => {
    expect(wrapper.find('.InputField-label').text()).toEqual('Colorado');
  });

  test('it sets the name, id, and htmlFor attributes according to input name', () => {
    const dropdown = wrapper.find('RegionDropdown');
    expect(wrapper.find('label').prop('htmlFor')).toEqual('state');
    expect(dropdown.prop('name')).toEqual('state');
    expect(dropdown.prop('id')).toEqual('state');
  });

  test('RegionDropdown calls onChange methods when onChange is invoked', () => {
    expect(onChangeMock).toHaveBeenCalledTimes(0);
    wrapper.find('RegionDropdown').simulate('change', '');
    expect(onChangeMock).toBeCalled();
  });
});
