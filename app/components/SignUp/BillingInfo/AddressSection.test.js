import React from 'react';
import enzyme from 'enzyme';
import { t } from '../../../../test/i18n/mocks';
import { AddressSection } from './AddressSection';

describe('AddressSection', () => {
  const defaultProps = { t };
  const shallow = (props) => {
    return enzyme.shallow(<AddressSection {...defaultProps} {...props} />);
  };

  test('it renders correct labels', () => {
    const labels = shallow().find('Field').map((field) => field.prop('label'));
    expect(labels).toEqual([
      'Street',
      'City',
      'Zipcode'
    ]);
  });
  test('zipcode is disabled when hasZipcode is false', () => {
    const defaultProp = { hasZipcode: false };
    const wrapper = shallow(defaultProp);
    expect(wrapper.find('#zipcode').prop('disabled')).toBeTruthy();
  });
  test('zipcode is enabled when hasZipcode is true', () => {
    const defaultProp = { hasZipcode: true };
    const wrapper = shallow(defaultProp);
    expect(wrapper.find('#zipcode').prop('disabled')).toBeFalsy();
  });
});
