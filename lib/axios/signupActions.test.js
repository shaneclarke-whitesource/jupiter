import * as actions from './signupActions';
import axios from 'axios';
jest.mock('axios');

describe('actions/signUpAxiosActions', () => {
  describe('getSignup', () => {
    test('it should call axios get', () => {
      const spy = jest.spyOn(axios, 'get');
      actions.getSignup({ user: 'username' }, 'endpoint');
      expect(spy).toHaveBeenCalled();
      expect(spy).toBeCalledWith('/api/signup/v1/endpoint', { user: 'username' },
        { axiosParameters: actions.axiosParameters });
    });
  });

  describe('postSignup', () => {
    test('it should call axios get', () => {
      const spy = jest.spyOn(axios, 'post');
      actions.postSignup({ user: 'username' }, 'endpoint');
      expect(spy).toHaveBeenCalled();
      expect(spy).toBeCalledWith('/api/signup/v1/endpoint', { user: 'username' },
        { axiosParameters: actions.axiosParameters });
    });
  });
});
