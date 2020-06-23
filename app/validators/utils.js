import { getSignup, postSignup, getCustomer } from '../../lib/axios/signupActions';
import { checkUsernameSuccess } from '../actions/checkUsername';

export const asyncValidateUsername = (username, dispatch, t) => {
  const endpoint = 'cloud-username-check';
  return new Promise((resolve, reject) => {
    if (username.includes('%')) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ userInfo: { username: [t('validation:username.symbolRestriction')] } });
    } else {
      getSignup({ username }, endpoint)
        .then((response) => {
          if (response.data.exist) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({ userInfo: { username: [t('validation:username.exists')] } });
          } else {
            resolve();
          }
          dispatch(checkUsernameSuccess(username, response.data.exist));
        });
    }
  });
};

export const asyncValidatePassword = (password, t) => {
  const endpoint = 'validation/password';
  return new Promise((resolve, reject) => {
    postSignup({ password }, endpoint)
      .then((response) => {
        if (response.data.valid && response.data.blacklistCheck === 'FAILED') {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ userInfo: { password: [t('validation:password.notComplicated')] } });
        } else {
          resolve();
        }
      });
  });
};

export const asyncValidateStates = (countryCode, t) => {
  const endpoint = `countries/${countryCode}`;
  return new Promise((resolve, reject) => {
    getCustomer(null, endpoint)
      .then((response) => {
        // if (response.data.valid && response.data.blacklistCheck === 'FAILED') {
        //   // eslint-disable-next-line prefer-promise-reject-errors
        //   reject({ userInfo: { password: [t('validation:password.notComplicated')] } });
        // } else {
        //   resolve();
        // }
      });
  });
};
