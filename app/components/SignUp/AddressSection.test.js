import React from 'react';
import { mountWithForm } from '../../../test/provider';
import { t } from '../../../test/i18n/mocks';
import AddressSectionForm, { AddressSection } from './AddressSection';

describe('AddressSection', () => {
  let wrapper;
  const defaultProps = {
    t,
    setCountry: jest.fn(),
    country: 'US',
    handleSubmit: jest.fn(),
    valid: true,
    history: {
      push: jest.fn()
    }
  };

  beforeEach(() => {
    wrapper = shallow(<AddressSection {...defaultProps} />);
  });

  test('it renders correct labels', () => {
    const labels = wrapper.find('Field').map((field) => field.prop('label'));
    expect(labels).toEqual([
      'City',
      'Street',
      'Zipcode',
      'Country',
      'State'
    ]);
  });

  test('it changes the country state when onChange is invoked', () => {
    const mounted = mountWithForm(AddressSectionForm, { defaultProps, withRouter: true });
    const event = {
      target: {
        value: 'AF'
      }
    };
    mounted.find('CountryDropdown').simulate('change', event);
    expect(mounted.find('CountryDropdown').props().value).toEqual('AF');
  });
});
