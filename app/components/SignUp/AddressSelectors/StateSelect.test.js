import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import StateSelect from './StateSelect';

describe('StateSelect', () => {
  let wrapper;
  const onChangeMock = jest.fn();
  const props = {
    country: 'US',
    label: 'Colorado',
    input: {
      name: 'state',
      onChange: onChangeMock
    }
  };
  beforeEach(() => {
    wrapper = shallow(<StateSelect {...props} />);
  });

  test('it renders', () => {
    const component = renderer.create(<StateSelect {...props} />).toJSON();
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
    wrapper.find('RegionDropdown').simulate('change', 'CA');
    expect(onChangeMock).toBeCalled();
  });

  test('it changes the region state when onChange is invoked', () => {
    expect(wrapper.state().region).toEqual('');
    wrapper.find('RegionDropdown').simulate('change', 'VA');
    expect(wrapper.state().region).toEqual('VA');
  });

  test('it changes the value prop in RegionDropdown when state is changed', () => {
    wrapper.setState({ region: 'CO' });
    expect(wrapper.find('RegionDropdown').prop('value')).toEqual('CO');
  });
});
