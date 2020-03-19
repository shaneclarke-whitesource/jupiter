import React from 'react';
import { t } from '../../../test/i18n/mocks';
import { UserInfo } from './UserInfo';

describe('UserInfo', () => {
  let wrapper;
  const checkIfExistsMock = jest.fn();
  const defaultProps = {
    checkIfExists: checkIfExistsMock,
    firstName: '',
    lastName: '',
    t
  };
  beforeEach(() => {
    wrapper = shallow(<UserInfo {...defaultProps} />);
  });

  afterEach(() => {
    checkIfExistsMock.mockRestore();
  });

  test('it renders 7 input fields', () => {
    expect(wrapper.find('Field').length).toEqual(8);
  });

  test('it renders correct labels', () => {
    const labels = wrapper.find('Field').map((field) => field.prop('label'));
    expect(labels).toEqual([
      'First Name',
      'Last Name',
      'Title (optional)',
      'Create Account Name',
      'Email Address',
      'Phone Number',
      'Create Password',
      'Confirm Password'
    ]);
  });

  test('username must grab only first two characters of firstName and lastName', () => {
    global.Math.random = () => '314315654';
    wrapper.setProps({ firstName: 'John', lastName: 'Doe' });
    expect(wrapper.instance().props.checkIfExists).toBeCalledWith('jodo.4315');
  });

  test('setUsername to be called on props update', () => {
    wrapper.setProps({ firstName: 'John', lastName: 'Doe' });
    expect(wrapper.instance().props.checkIfExists).toHaveBeenCalled();
  });
});
