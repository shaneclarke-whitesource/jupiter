import React from 'react';
import renderer from 'react-test-renderer';
import CountrySelect from './CountrySelect';
import { shallow } from 'enzyme';

describe('CountrySelect', () => {
  let wrapper;
  const onChangeMock = jest.fn();
  const onCountryChangeMock = jest.fn();
  const props = {
    country: 'US',
    label: 'United States',
    onCountryChange: onCountryChangeMock,
    input: {
      name: 'country',
      onChange: onChangeMock
    }
  };
  beforeEach(() => {
    wrapper = shallow(<CountrySelect {...props} />);
  });

  test('it renders', () => {
    const component = renderer.create(<CountrySelect {...props} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  test('it renders the label according to the label prop', () => {
    expect(wrapper.find('.InputField-label').text()).toEqual('United States');
  });
  test('CountryDropdown call onChange methods when onChange is invoked', () => {
    wrapper.find('CountryDropdown').simulate('change', 'New Country');
    expect(onChangeMock).toBeCalled();
    expect(onCountryChangeMock).toBeCalledWith('New Country');
  });
  test('it sets the name, id, and htmlFor attributes according to input name', () => {
    const dropdown = wrapper.find('CountryDropdown');
    expect(wrapper.find('label').prop('htmlFor')).toEqual('country');
    expect(dropdown.prop('name')).toEqual('country');
    expect(dropdown.prop('id')).toEqual('country');
  });
});
