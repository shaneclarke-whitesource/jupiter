import mockAxios from 'axios';
import * as actions from './signUpUser';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('actions/signUpUser', () => {
  test('it should create an action to succeed', () => {
    const expectedAction = {
      type: actions.SUBMIT_SUCCESS,
      ddi: 'test_user'
    };
    expect(actions.submitSuccess('test_user')).toEqual(expectedAction);
  });

  test('it should create an action to fail', () => {
    const error = { status: 400, data: {} };
    const expectedAction = {
      type: actions.SUBMIT_FAILURE,
      error: {
        code: 400,
        message: undefined
      }
    };
    expect(actions.submitFailure(error)).toEqual(expectedAction);
  });

  test('it should create an action for pending', () => {
    const expectedAction = {
      type: actions.SUBMIT_PENDING,
      accountname: 'acct',
      username: 'usrname'
    };
    expect(actions.submitPending({}, 'usrname', 'acct')).toEqual(expectedAction);
  });
});

describe('async submit action', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  test('axios calls pending, submit and reset on successful submit', async () => {
    const mockData = {
      'ddi': 123
    };
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: mockData }));
    const expectedActions = [
      {
        type: actions.SUBMIT_PENDING,
        accountname: undefined,
        username: undefined
      },
      {
        type: actions.SUBMIT_SUCCESS,
        ddi: 123
      },
      {
        meta: {
          form: 'signUp'
        },
        type: '@@redux-form/RESET'
      }
    ];
    await store.dispatch(actions.submitUserData());
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.post).toHaveBeenCalled();
  });
  test('axios calls submit failure', async () => {
    const error = { response: { status: 401, data: { message: 'An error has occurred' } } };
    mockAxios.post.mockImplementationOnce(() => Promise.reject(error));
    const expectedActions = [
      {
        type: actions.SUBMIT_PENDING,
        accountname: undefined,
        username: undefined
      },
      {
        type: actions.SUBMIT_FAILURE,
        error: {
          code: 401,
          message: 'An error has occurred'
        }
      }
    ];
    return new Promise((resolve, reject) => {
      store.subscribe(() => {
        const currentActions = store.getActions();
        expect(currentActions).toEqual(expectedActions.slice(0, currentActions.length));
        expect(mockAxios.post).toHaveBeenCalled();
        if (currentActions.length === expectedActions.length) {
          resolve(true);
        }
      });
      store.dispatch(actions.submitUserData());
    });
  });
});
