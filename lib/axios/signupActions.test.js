import * as actions from './signupActions';
import axios from 'axios';
jest.mock('axios');

describe('actions/signUpAxiosActions', () => {
  describe('getSignup', () => {
    const expected = {
      params: { user: 'username' },
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      withCredentials: true
    };
    test('it should call axios get', () => {
      // mockAxios.post.mockImplementationOnce(() => Promise.resolve({}));
      const spy = jest.spyOn(axios, 'get');
      actions.getSignup({ user: 'username' }, 'endpoint');
      expect(spy).toHaveBeenCalled();
      expect(spy).toBeCalledWith('/api/signup/v1/endpoint', expected);
    });
  });

  describe('postSignup', () => {
    const expected = {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      withCredentials: true
    };
    test('it should call axios get', () => {
      // mockAxios.post.mockImplementationOnce(() => Promise.resolve({}));
      const spy = jest.spyOn(axios, 'post');
      actions.postSignup({ user: 'username' }, 'endpoint');
      expect(spy).toHaveBeenCalled();
      expect(spy).toBeCalledWith('/api/signup/v1/endpoint', { user: 'username' }, expected);
    });
  });
});
