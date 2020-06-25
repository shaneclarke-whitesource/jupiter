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
});
