import mockAxios from 'axios';
import * as actions from './checkUsername';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('actions/checkUsername', () => {
  test('it should create an action for pending', () => {
    const expectedAction = {
      type: actions.CHECK_USERNAME_PENDING
    };
    expect(actions.checkUsernamePending()).toEqual(expectedAction);
  });

  test('it should create an action to succeed', () => {
    const expectedAction = {
      type: actions.CHECK_USERNAME_SUCCESS,
      exists: true,
      username: 'test.user.1234'
    };
    expect(actions.checkUsernameSuccess('test.user.1234', true)).toEqual(expectedAction);
  });

  test('it should create an action to fail', () => {
    const errorCode = { status: 400, data: { message: 'oh noes!' } };
    const expectedAction = {
      type: actions.CHECK_USERNAME_FAILURE,
      error: {
        code: 400,
        message: 'oh noes!'
      }
    };
    expect(actions.checkUsernameFailure(errorCode)).toEqual(expectedAction);
  });
  describe('async checkUsername action', () => {
    let store;
    beforeEach(() => {
      store = mockStore();
    });

    afterEach(async () => {
      jest.restoreAllMocks();
    });

    test('axios calls pending, and success on successful call', async () => {
      const mockData = {
        exist: false
      };
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: mockData }));
      const expectedActions = [
        {
          type: actions.CHECK_USERNAME_PENDING
        },
        {
          type: actions.CHECK_USERNAME_SUCCESS,
          username: 'test.user.1234',
          exists: false
        }
      ];
      await store.dispatch(actions.checkUsername('test.user.1234'));
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalled();
    });

    test('axios calls failure if error occurs', async () => {
      const error = { response: { status: 401, data: { message: 'oh noes!' } } };
      mockAxios.get.mockImplementationOnce(() => Promise.reject(error));
      const expectedActions = [
        {
          type: actions.CHECK_USERNAME_PENDING
        },
        {
          type: actions.CHECK_USERNAME_FAILURE,
          error: {
            code: 401,
            message: 'oh noes!'
          }
        }
      ];
      return new Promise((resolve, reject) => {
        store.subscribe(() => {
          const currentActions = store.getActions();
          expect(currentActions).toEqual(expectedActions.slice(0, currentActions.length));
          if (currentActions.length === expectedActions.length) {
            resolve(true);
          }
        });
        store.dispatch(actions.checkUsername('test.user.1234'));
      });
    });
  });
});
