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
      userInfo: {
        firstName: 'mr',
        lastName: 'wow',
        username: 'muchWow.1234',
        accountName: 'newAccountName',
        email: 'email@company.com',
        password: 'Password123!',
        passwordValidate: 'Password123!',
        phoneNumber: '1231232',
        address: {
          country: 'US',
          street: 'Tree Ln.',
          state: 'CO',
          city: 'Leaf City',
          zipcode: '12345'
        },
        productType: 'product'
      }
    };
    test('it passes if all values are valid', () => {
      expect(validateUserInfo({ ...valid })).toEqual({ userInfo: {} });
    });

    test('it fails if firstName is longer than 32 characters', () => {
      const longName = _.fill(Array(101), 'a').join('');
      const result = validateUserInfo({ userInfo: { firstName: longName } });
      expect(result.userInfo.firstName).toEqual(['Input must be less than 100 characters long']);
    });

    test('it fails if lastName is longer than 32 characters', () => {
      const longName = _.fill(Array(101), 'b').join('');
      const result = validateUserInfo({ userInfo: { lastName: longName } });
      expect(result.userInfo.lastName).toEqual(['Input must be less than 100 characters long']);
    });

    test('it fails if username is longer than 10 characters', () => {
      const longName = _.fill(Array(256), 'c').join('');
      const result = validateUserInfo({ userInfo: { username: longName } });
      expect(result.userInfo.username).toEqual(['Username must be less than or equal to 15 characters long']);
    });

    ['firstName', 'lastName'].forEach((field) => {
      test(`returns required when ${field} is empty`, () => {
        const result = validateUserInfo({ userInfo: { [field]: '' } });
        expect([].concat(result.userInfo[field])).toEqual(['Required']);
      });
      test(`returns required when ${field} is empty string`, () => {
        const result = validateUserInfo({ userInfo: { [field]: '     ' } });
        expect([].concat(result.userInfo[field])).toEqual(['Required']);
      });
    });

    test('username returns required and minimum length when empty', () => {
      const result = validateUserInfo({ userInfo: { username: '' } });
      expect([].concat(result.userInfo.username)).toEqual([
        'Required',
        'Username must be at least 8 characters long'
      ]);
    });
    test('username returns required and minimum length when empty string', () => {
      const result = validateUserInfo({ userInfo: { username: '    ' } });
      expect([].concat(result.userInfo.username)).toEqual([
        'Required',
        'Username must be at least 8 characters long'
      ]);
    });

    test('username returns minimum length when it is less than 8 characters', () => {
      const result = validateUserInfo({ userInfo: { username: 'user' } });
      expect([].concat(result.userInfo.username)).toEqual([
        'Username must be at least 8 characters long'
      ]);
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
        password: ['Password must contain at least one uppercase letter, one numeric digit, and one special character.']
      });
    });
    test('it fails if password does not include uppercase letter', () => {
      const invalid = {
        password: 'password123',
        passwordValidate: 'password123'
      };
      expect(validatePasswords(invalid)).toEqual({
        password: ['Password must contain at least one uppercase letter, one numeric digit, and one special character.']
      });
    });
    test('it fails if password does not include a number', () => {
      const invalid = {
        password: 'Password!!',
        passwordValidate: 'Password!!'
      };
      expect(validatePasswords(invalid)).toEqual({
        password: ['Password must contain at least one uppercase letter, one numeric digit, and one special character.']
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

  describe('validateProductType', () => {
    const validateProductType = (props) => {
      return validators.validateProductType(props, defaultProps);
    };
    test('it passes with valid input', () => {
      expect(validateProductType({ productType: 'product' })).toEqual(undefined);
    });
    test('it fails with empty input', () => {
      expect(validateProductType({ productType: '' })).toEqual({ productType: ['Required'] });
    });
  });
  describe('validateAddress', () => {
    const defaultAddressProps = {
      address: {
        country: 'US',
        street: 'Tree Ln.',
        state: 'CO',
        city: 'Leaf City',
        zipcode: '12345'
      }
    };
    const validateAddressMock = (props) => {
      return validators.validateAddress(props, defaultProps);
    };

    test('it passes with valid input', () => {
      expect(validateAddressMock({ ...defaultAddressProps })).toEqual({});
    });

    ['country', 'street', 'state', 'city', 'zipcode'].forEach((field) => {
      test(`returns required when ${field} is empty`, () => {
        const result = validateAddressMock({ address: { field: '' } });
        expect([].concat(result.address[field])).toEqual(['Required']);
      });
      test(`returns required when ${field} is empty string`, () => {
        const result = validateAddressMock({ address: { [field]: '     ' } });
        expect([].concat(result.address[field])).toEqual(['Required']);
      });
    });

    test('zipcode sends correct message if it is too long', () => {
      const longZip = _.fill(Array(21), 'c').join('');
      const result = validateAddressMock({ address: { zipcode: longZip } });
      expect(result.address.zipcode).toEqual(['Must be less than 20 characters long']);
    });
  });
});
