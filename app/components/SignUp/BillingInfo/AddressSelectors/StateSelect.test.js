import { mountWithForm } from '../../../../../test/provider';
import { StateSelect } from './StateSelect';
const { t } = global;

describe('StateSelect', () => {
  let wrapper;
  const onChangeMock = jest.fn();
  const defaultProps = {
    country: {},
    setRegion: onChangeMock,
    t
  };
  beforeEach(() => {
    wrapper = mountWithForm(StateSelect, { defaultProps });
  });

  test('it renders the label according to the label prop', () => {
    expect(wrapper.find('.InputField-label').text()).toEqual('State');
  });

  test('it sets the id, and htmlFor attributes according to input id', () => {
    expect(wrapper.find('label').prop('htmlFor')).toEqual('state-select-dropdown');
    expect(wrapper.find('select').prop('id')).toEqual('state-select-dropdown');
  });

  test('RegionDropdown calls onChange methods when onChange is invoked', () => {
    expect(onChangeMock).toHaveBeenCalledTimes(0);
    wrapper.find('select').simulate('change', '');
    expect(onChangeMock).toBeCalled();
  });
});
