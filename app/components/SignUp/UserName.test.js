import React from 'react';
import { t } from '../../../test/i18n/mocks';
import { UserName } from './UserName';

describe('UserName', () => {
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

  afterEach(() => {
    checkIfExistsMock.mockRestore();
  });

  test('setUsername to be called', () => {
    shallow(<UserName {...defaultProps} />);
    expect(setUsernameMock).toHaveBeenCalled();
  });
});
