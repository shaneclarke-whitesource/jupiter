import React from 'react';
import { t } from '../../../test/i18n/mocks';
import { UserName } from './UserName';

describe('UserName', () => {
  let wrapper;
  const checkIfExistsMock = jest.fn();
  const setUsernameMock = jest.fn();
  const defaultProps = {
    checkIfExists: checkIfExistsMock,
    username: 'first.last.123',
    exists: false,
    error: false,
    setUsername: setUsernameMock,
    t
  };

  beforeEach(() => {
    wrapper = shallow(<UserName {...defaultProps} />);
    jest.spyOn(global.Math, 'random').mockReturnValue(12345678);
  });

  afterEach(() => {
    global.Math.random.mockRestore();
    checkIfExistsMock.mockRestore();
  });

  test('it calls usernameChanged when onBlur is invoked', () => {
    const event = {
      target: {
        value: 'user.name.abc'
      },
      preventDefault: jest.fn()
    };
    expect(checkIfExistsMock).toHaveBeenCalledTimes(0);
    wrapper.find('Field').simulate('blur', event);
    expect(checkIfExistsMock).toHaveBeenCalledTimes(1);
  });

  test('setUsername to be called if the username does not exist', () => {
    shallow(<UserName {...defaultProps} exists={false} />);
    expect(setUsernameMock).toHaveBeenCalled();
  });

  test('it renders an error message if the username exists', () => {
    const errorWrap = shallow(<UserName {...defaultProps} exists />);
    expect(errorWrap.find('hx-error small').text())
      .toEqual('This username already exists. Please choose another one.');
  });
});
