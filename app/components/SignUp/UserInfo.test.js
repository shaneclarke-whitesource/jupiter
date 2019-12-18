import React from 'react';
import { renderWithForm } from '../../../test/provider';
import { t } from '../../../test/i18n/mocks';
import { UserInfo } from './UserInfo';

describe('UserInfo', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserInfo t={t} />);
  });

  test('it renders', () => {
    const rendered = renderWithForm(UserInfo, { t }).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('it renders 7 input fields', () => {
    expect(wrapper.find('Field').length).toEqual(9);
  });

  test('it renders correct labels', () => {
    const labels = wrapper.find('Field').map((field) => field.prop('label'));
    expect(labels).toEqual([
      'First Name',
      'Last Name',
      'Title (optional)',
      'Email Address',
      'Phone Number',
      'Create Account Name',
      'Create Username',
      'Create Password',
      'Confirm Password'
    ]);
  });
});
