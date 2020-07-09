import React from 'react';
import { UserInfo } from './UserInfo';
import debounce from 'lodash/debounce';
const { t } = global;
jest.useFakeTimers();

jest.mock('lodash/debounce', () => jest.fn((fn) => fn));

describe('UserInfo', () => {
  const mock = jest.fn();
  const checkIfExistsMock = debounce(mock, 150);
  const defaultProps = {
    checkIfExists: checkIfExistsMock,
    firstName: '',
    lastName: '',
    clearResult: jest.fn(),
    t
  };

  const shallowWrapper = (props) => {
    return shallow(<UserInfo {...defaultProps} {...props} />);
  };

  afterEach(() => {
    checkIfExistsMock.mockRestore();
  });

  test('it renders 7 input fields', () => {
    expect(shallowWrapper().find('Field').length).toEqual(8);
  });

  test('it renders correct labels', () => {
    const labels = shallowWrapper().find('Field').map((field) => field.prop('label'));
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
    shallowWrapper().setProps({ firstName: 'John', lastName: 'Doe' });
    jest.runAllTimers();
    expect(shallowWrapper().instance().props.checkIfExists).toBeCalledWith('jodo.4315');
  });

  test('setUsername to be called on props update', () => {
    shallowWrapper().setProps({ firstName: 'John', lastName: 'Doe' });
    jest.runAllTimers();
    expect(shallowWrapper().instance().props.checkIfExists).toHaveBeenCalled();
  });
});
