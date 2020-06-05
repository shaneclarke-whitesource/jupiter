import React from 'react';
import enzyme from 'enzyme';
import { mountWithForm } from '../../../../test/provider';
import { t } from '../../../../test/i18n/mocks';
import { AddressSection } from './AddressSection';

describe('AddressSection', () => {
  const setCountry = jest.fn();
  const defaultProps = {
    setCountry,
    country: 'US',
    t
  };

  const mounted = (props) => {
    return mountWithForm(AddressSection, { defaultProps, props });
  };

  const shallow = (props) => {
    return enzyme.shallow(<AddressSection {...defaultProps} {...props} />);
  };

  test('it renders correct labels', () => {
    const labels = shallow().find('Field').map((field) => field.prop('label'));
    expect(labels).toEqual([
      'Street',
      'City',
      'Zipcode',
      'Country',
      'State'
    ]);
  });

  test('it calls setCountry with the correct input', () => {
    const wrapper = mounted();
    const event = {
      target: {
        value: 'AF'
      }
    };
    wrapper.find('CountryDropdown').simulate('change', event);
    wrapper.update();
    expect(setCountry.mock.calls[0][0]).toBe('AF');
  });
});
