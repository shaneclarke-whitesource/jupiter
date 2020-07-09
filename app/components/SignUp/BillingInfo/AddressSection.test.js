import React from 'react';
import { AddressSection } from './AddressSection';
const { t } = global;

describe('AddressSection', () => {
  const defaultProps = { t };

  const shallowWrapper = (props) => {
    return shallow(<AddressSection {...defaultProps} {...props} />);
  };

  test('it renders correct labels', () => {
    const labels = shallowWrapper().find('Field').map((field) => field.prop('label'));
    expect(labels).toEqual([
      'Street',
      'City',
      'Zipcode'
    ]);
  });
});
