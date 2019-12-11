import React from 'react';
import renderer from 'react-test-renderer';
import { shallowWithForm, renderWithForm, mountWithForm } from '../../../../test/provider';
import StateSelect from './StateSelect';
import _ from 'lodash'

describe('StateSelect', () => {
  let wrapper;
  const onChangeMock = jest.fn();
  const defaultProps = {
    country: 'US',
    label: 'Colorado',
    setRegion: onChangeMock,
    input: {
      name: 'state'
    }
  };
  beforeEach(() => {
    wrapper = mountWithForm(StateSelect, defaultProps);
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
    const setRegionMock = jest.fn(() => 'CA');
    const props = _.merge({}, defaultProps, { setRegion: setRegionMock });
    const mounted = mountWithForm(StateSelect, props);
    console.log(mounted.props().setRegion);
    mounted.find('RegionDropdown').simulate('change', 'CA');
    expect(setRegionMock).toBeCalled();
  });

  test('it changes the region state when onChange is invoked', () => {
    expect(wrapper.prop('region')).toEqual('');
    wrapper.find('RegionDropdown').simulate('change', 'VA');
    expect(wrapper.prop('region')).toEqual('VA');
  });

  test('it changes the value prop in RegionDropdown when state is changed', () => {
    wrapper.find('RegionDropdown').simulate('change', 'CO');
    expect(wrapper.find('RegionDropdown').prop('value')).toEqual('CO');
  });
});
