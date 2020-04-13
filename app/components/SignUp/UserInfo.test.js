import React from 'react';
import { t } from '../../../test/i18n/mocks';
import { UserInfo } from './UserInfo';
import debounce from 'lodash/debounce';
jest.useFakeTimers();

jest.mock('lodash/debounce', () => jest.fn((fn) => fn));

describe('UserInfo', () => {
  let wrapper;
  const mock = jest.fn();
  const checkIfExistsMock = debounce(mock, 150);
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
    jest.runAllTimers();
    expect(wrapper.instance().props.checkIfExists).toBeCalledWith('jodo.4315');
  });

  test('setUsername to be called on props update', () => {
    wrapper.setProps({ firstName: 'John', lastName: 'Doe' });
    jest.runAllTimers();
    expect(wrapper.instance().props.checkIfExists).toHaveBeenCalled();
  });
});
