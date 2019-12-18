import mockAxios from 'axios';
import * as actions from './signUpUser';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('actions/signUpUser', () => {
  test('it should create an action to succeed', () => {
    const data = { user: 'test user' };
    const expectedAction = {
      type: actions.SUBMIT_SUCCESS,
      pending: false,
      data
    };
    expect(actions.submitSuccess(data)).toEqual(expectedAction);
  });

  test('it should create an action to fail', () => {
    const error = { error: { code: 400 } };
    const expectedAction = {
      type: actions.SUBMIT_FAILURE,
      pending: false,
      error
    };
    expect(actions.submitFailure(error)).toEqual(expectedAction);
  });

  test('it should create an action for pending', () => {
    const expectedAction = {
      type: actions.SUBMIT_PENDING,
      pending: true
    };
    expect(actions.submitPending()).toEqual(expectedAction);
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
      'data': 123
    };
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: mockData }));
    const expectedActions = [
      {
        type: actions.SUBMIT_PENDING,
        pending: true
      },
      {
        type: actions.SUBMIT_SUCCESS,
        pending: false,
        data: mockData
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
  // test('axios calls submit failure', async () => {
  //   const error = { response: { data: { message: 'An error has occurred' } } };
  //   mockAxios.post.mockImplementationOnce(() => Promise.reject(error));
  //   const expectedActions = [
  //     {
  //       type: actions.SUBMIT_PENDING,
  //       pending: true
  //     },
  //     {
  //       type: actions.SUBMIT_FAILURE,
  //       pending: false,
  //       error: {
  //         message: 'An error has occurred'
  //       }
  //     }
  //   ];
  //   await store.dispatch(actions.submitUserData());
  //   expect(store.getActions()).toEqual(expectedActions);
  //   // expect(mockAxios.post).toHaveBeenCalled();
  // });
});
