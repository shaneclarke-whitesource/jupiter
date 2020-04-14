import * as validators from './utils';
import { t } from '../../test/i18n/mocks';
import axios from 'axios';


describe('validators/utils', () => {
  describe('asyncValidateUsername', () => {
    const asyncValidateUsernameMock = (props) => {
      return validators.asyncValidateUsername(props, jest.fn(), t);
    };
    test('returns an error if username includes %', () => {
      const getSignupData = { data: { exist: false } };
      axios.get.mockImplementationOnce(() => Promise.resolve(getSignupData));
      return asyncValidateUsernameMock('user1%').catch((e) => {
        expect(e.userInfo.username).toEqual(['Username must not include these special character: %']);
      });
    });

    test('returns an error if exist is true', () => {
      const getSignupData = { data: { exist: true } };
      axios.get.mockImplementationOnce(() => Promise.resolve(getSignupData));
      return asyncValidateUsernameMock('user1').catch((e) => {
        expect(e.userInfo.username).toEqual(['This username already exists. Please choose another one.']);
      });
    });

    test('returns an resolved promise if it passes', () => {
      const getSignupData = { data: { exist: false } };
      axios.get.mockImplementationOnce(() => Promise.resolve(getSignupData));
      expect(asyncValidateUsernameMock('user1')).toEqual(Promise.resolve({}));
    });
  });

  describe('checkPassword', () => {
    const asyncValidatePasswordMock = (props) => {
      return validators.asyncValidatePassword(props, t);
    };
    test('returns an error if valid it FALSE and blacklistCheck fails', () => {
      const postSignupData = { data: { valid: 'FALSE', blacklistCheck: 'FAILED' } };
      axios.post.mockImplementationOnce(() => Promise.resolve(postSignupData));
      return asyncValidatePasswordMock({ password: 'Password123!' }).catch((e) => {
        expect(e.userInfo.password).toEqual(['This password is too easy to guess. Please choose another password.']);
      });
    });

    test('returns an error if valid it TRUE and blacklistCheck fails', () => {
      const postSignupData = { data: { valid: 'TRUE', blacklistCheck: 'FAILED' } };
      axios.post.mockImplementationOnce(() => Promise.resolve(postSignupData));
      return asyncValidatePasswordMock({ password: 'Password123!' }).catch((e) => {
        expect(e.userInfo.password).toEqual(['This password is too easy to guess. Please choose another password.']);
      });
    });

    test('returns a resolved Promise if valid it TRUE and blacklistCheck passes', () => {
      const postSignupData = { data: { valid: 'TRUE', blacklistCheck: 'PASSED' } };
      axios.post.mockImplementationOnce(() => Promise.resolve(postSignupData));
      expect(asyncValidatePasswordMock({ password: 'Password123!' })).toEqual(Promise.resolve({}));
    });
  });
});
