import React from 'react';
import { mountWithForm } from '../../../../../test/provider';
import { StateSelect } from './StateSelect';
const { t } = global;

describe('StateSelect', () => {
  const onChangeMock = jest.fn();
  const defaultProps = {
    country: {},
    setRegion: onChangeMock,
    t
  };
  const mounted = (props) => {
    return mountWithForm(StateSelect, { defaultProps, props });
  };

  const shallowWrapper = (props) => {
    return shallow(<StateSelect {...defaultProps} {...props} />);
  };

  test('it renders the label according to the label prop', () => {
    expect(mounted().find('.InputField-label').text()).toEqual('State');
  });

  test('it sets the id, and htmlFor attributes according to input id', () => {
    expect(mounted().find('label').prop('htmlFor')).toEqual('state-select-dropdown');
    expect(mounted().find('select').prop('id')).toEqual('state-select-dropdown');
  });

  test('Dropdown calls onChange methods when onChange is invoked', () => {
    expect(onChangeMock).toHaveBeenCalledTimes(0);
    mounted().find('select').simulate('change', '');
    expect(onChangeMock).toBeCalled();
  });

  test('Dropdown is disabled if states prop is undefined', () => {
    const wrapper = mounted();
    expect(wrapper.find('select').prop('disabled')).toBeTruthy();
  });

  test('Dropdown is disabled if states exist but length is zero', () => {
    const props = { country: { states: [] } };
    const wrapper = mounted(props);
    expect(wrapper.find('select').prop('disabled')).toBeTruthy();
  });

  test('Dropdown is enabled if states has a length', () => {
    const props = { country: { states: ['test'] } };
    const wrapper = mounted(props);
    expect(wrapper.find('select').prop('disabled')).toBeFalsy();
  });

  test('it renders correct option state labels and values', () => {
    const country = {
      states: [
        { code: 'S1', name: 'State 1' },
        { code: 'S2', name: 'State 2' },
        { code: 'S3', name: 'State 3' }
      ]
    };
    const wrapper = shallowWrapper({ country });
    const labels = wrapper.find('option').map((opt) => opt.text());
    const values = wrapper.find('option').map((opt) => opt.prop('value'));
    expect(labels).toEqual(['State 1', 'State 2', 'State 3']);
    expect(values).toEqual(['State 1', 'State 2', 'State 3']);
  });
});
