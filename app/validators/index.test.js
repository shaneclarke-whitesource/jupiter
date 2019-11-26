import _ from 'lodash';
import * as validators from './index';
import { t } from '../../test/i18n/mocks';

describe('validators', () => {
  const defaultProps = { t };
  describe('validateUser', () => {
    const validateUserInfo = (props) => {
      return validators.validateUser(props, defaultProps);
    };
    const valid = {
      firstName: 'mr',
      lastName: 'wow',
      username: 'muchWow'
    };
    test('it passes if all values are valid', () => {
      expect(validateUserInfo({ ...valid })).toEqual({});
    });

    test('it fails if firstName is longer than 32 characters', () => {
      const longName = _.fill(Array(33), 'a').join('');
      const result = validateUserInfo({ firstName: longName });
      expect(result.firstName).toEqual(['Input must be less than 32 characters long']);
    });

    test('it fails if lastName is longer than 32 characters', () => {
      const longName = _.fill(Array(33), 'b').join('');
      const result = validateUserInfo({ lastName: longName });
      expect(result.lastName).toEqual(['Input must be less than 32 characters long']);
    });

    test('it fails if username is longer than 10 characters', () => {
      const longName = _.fill(Array(11), 'c').join('');
      const result = validateUserInfo({ username: longName });
      expect(result.username).toEqual(['Username must be less than 10 characters long']);
    });

    ['firstName', 'lastName', 'username'].forEach((field) => {
      test(`returns required when ${field} is empty`, () => {
        const result = validateUserInfo({ [field]: '' });
        expect([].concat(result[field])).toEqual(['Required']);
      });
      test(`returns required when ${field} is empty string`, () => {
        const result = validateUserInfo({ [field]: '     ' });
        expect([].concat(result[field])).toEqual(['Required']);
      });
    });
  });
  describe('validateEmail', () => {
    const validateEmailDomain = (props) => {
      return validators.validateEmail(props, defaultProps);
    };
    test('it passes if email is present and in correct format', () => {
      expect(validateEmailDomain({ email: 'myname@rackspace.com' })).toEqual({});
    });
    test('it fails if email is not in correct format', () => {
      expect(validateEmailDomain({ email: 'mynamerackspace.com' }))
        .toEqual({ email: ['Email domain must be in valid format'] });
    });
    test('it fails if empty', () => {
      expect(validateEmailDomain({ email: ' ' }))
        .toEqual({ email: ['Required', 'Email domain must be in valid format'] });
    });
  });

  describe('validatePassword', () => {
    const validatePasswords = (props) => {
      return validators.validatePassword(props, defaultProps);
    };
    test('it passes if password is valid', () => {
      const valid = {
        password: 'Password123!',
        passwordValidate: 'Password123!'
      };
      expect(validatePasswords(valid)).toEqual({});
    });
    test('it fails if password does not include special character', () => {
      const invalid = {
        password: 'Password123',
        passwordValidate: 'Password123'
      };
      expect(validatePasswords(invalid)).toEqual({
        password: ['Password must contain at least one numeric digit, one special character, '
        + 'and one uppercase and one lowercase letter']
      });
    });
    test('it fails if password does not include uppercase letter', () => {
      const invalid = {
        password: 'password123',
        passwordValidate: 'password123'
      };
      expect(validatePasswords(invalid)).toEqual({
        password: ['Password must contain at least one numeric digit, one special character, '
        + 'and one uppercase and one lowercase letter']
      });
    });
    test('it fails if password does not include a number', () => {
      const invalid = {
        password: 'Password!!',
        passwordValidate: 'Password!!'
      };
      expect(validatePasswords(invalid)).toEqual({
        password: ['Password must contain at least one numeric digit, one special character, '
        + 'and one uppercase and one lowercase letter']
      });
    });
    test('it fails if password is less than 8 characters', () => {
      const invalid = {
        password: 'Pass1!',
        passwordValidate: 'Pass1!'
      };
      expect(validatePasswords(invalid))
        .toEqual({ password: ['Password must be at least 8 characters long'] });
    });
    test('it fails if passwords do not match', () => {
      const invalid = {
        password: 'Password123!',
        passwordValidate: 'Pass123!'
      };
      expect(validatePasswords(invalid))
        .toEqual({ passwordValidate: ['Passwords do not match'] });
    });
  });
});
