import React from 'react';
import { t } from '../../../test/i18n/mocks';
import { UserInfo } from './UserInfo';

describe('UserInfo', () => {
  let wrapper;
  const checkIfExistsMock = jest.fn();
  const defaultProps = {
    checkIfExists: checkIfExistsMock,
    firstName: 'John',
    lastName: 'Doe',
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
    global.Math.random = () => '3abc15654';
    const field = wrapper.find('Field').at(0);
    expect(checkIfExistsMock).toBeCalledTimes(0);
    field.simulate('blur');
    expect(checkIfExistsMock).toBeCalledWith('jodo.bc156');
  });

  test('it invokes checkIfExists when onBlur is invoked on firstName field', () => {
    const field = wrapper.find('Field').at(0);
    expect(checkIfExistsMock).toBeCalledTimes(0);
    field.simulate('blur');
    expect(checkIfExistsMock).toBeCalledTimes(1);
  });

  test('it invokes checkIfExists when onBlur is invoked on lastName field', () => {
    const field = wrapper.find('Field').at(1);
    expect(checkIfExistsMock).toBeCalledTimes(0);
    field.simulate('blur');
    expect(checkIfExistsMock).toBeCalledTimes(1);
  });
});
