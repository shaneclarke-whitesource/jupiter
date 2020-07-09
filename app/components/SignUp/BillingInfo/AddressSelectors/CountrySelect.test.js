import React from 'react';
import { mountWithForm } from '../../../../../test/provider';
import { CountrySelect } from './CountrySelect';
const { t } = global;

describe('CountrySelect', () => {
  const getCountries = jest.fn();
  const getCountry = jest.fn();
  const defaultProps = {
    countries: {},
    getCountries,
    getCountry,
    t
  };

  const mounted = (props) => {
    return mountWithForm(CountrySelect, { defaultProps, props });
  };

  const shallowWrapper = (props) => {
    return shallow(<CountrySelect {...defaultProps} {...props} />);
  };

  test('it calls getCountriesMock on mount', () => {
    mounted();
    expect(getCountries).toHaveBeenCalled();
  });

  test('it renders a Dropdown with correct label', () => {
    const wrapper = mounted();
    expect(wrapper.find('.InputField-label').text()).toEqual('Country');
  });

  test('it renders the options within the dropdown', () => {
    const countries = {
      'C1': { code: 'C1', name: 'Country 1' },
      'C2': { code: 'C2', name: 'Country 2' }
    };
    const wrapper = shallowWrapper({ countries });
    expect(wrapper.find('option').length).toEqual(2);
  });

  test('it renders the correct option labels and values', () => {
    const countries = {
      'C1': { code: 'C1', name: 'Country 1' },
      'C2': { code: 'C2', name: 'Country 2' },
      'C3': { code: 'C3', name: 'Country 3' }
    };
    const wrapper = shallowWrapper({ countries });
    const labels = wrapper.find('option').map((opt) => opt.text());
    const values = wrapper.find('option').map((opt) => opt.prop('value'));
    expect(labels).toEqual(['Country 1', 'Country 2', 'Country 3']);
    expect(values).toEqual(['C1', 'C2', 'C3']);
  });

  test('it calls getCountry prop when onChange is invoked', () => {
    const event = {
      target: {
        value: 'US'
      }
    };
    const wrapper = mounted();
    wrapper.find('select').simulate('change', event);
    expect(getCountry).toHaveBeenCalledWith('US');
  });
});
