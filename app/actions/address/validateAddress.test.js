import mockAxios from 'axios';
import * as actions from './validateAddress';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('actions/validateAddress', () => {
  test('it should create an action for pending', () => {
    const expectedAction = {
      type: actions.POST_ADDRESS_PENDING
    };
    expect(actions.postAddressPending()).toEqual(expectedAction);
  });

  test('it should create an action to succeed', () => {
    const address = {
      zipcode: '80000',
      country: 'US',
      city: 'San Francisco',
      street: '1 Fanatical Pl',
      state: 'Texas'
    };
    const expectedAction = {
      type: actions.VALIDATE_ADDRESS_SUCCESS,
      address,
      valid: true
    };
    expect(actions.validateAddressSuccess(address)).toEqual(expectedAction);
  });

  test('it should create an action to fail', () => {
    // const error = { status: 400, data: { message: 'oh noes!' } };
    const error = {
      errorField: [
        {
          name: 'zipcode',
          description: 'Field must be present'
        }
      ],
      outcome: 'INVALID'
    };
    const expectedAction = {
      type: actions.VALIDATE_ADDRESS_FAILURE,
      error,
      valid: false
    };
    expect(actions.validateAddressFailure(error)).toEqual(expectedAction);
  });

  test('it should create an action for post fail', () => {
    const error = { status: 400, data: { message: 'oh noes!' } };
    const expectedAction = {
      type: actions.POST_ADDRESS_FAILURE,
      error
    };
    expect(actions.postAddressFailure(error)).toEqual(expectedAction);
  });

  test('axios calls success if if address is valid', async () => {
    const store = mockStore();
    const mockData = {
      matchStatus: 'C4',
      address: [
        {
          matchPercentage: '80.01',
          zipcode: '78218-2179',
          country: 'US',
          city: 'San Antonio',
          street: '1 Fanatical Pl',
          state: 'Texas',
          statecode: 'TX'
        }
      ],
      'outcome': 'VALID'
    };
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: mockData }));
    const expectedActions = [
      {
        type: actions.POST_ADDRESS_PENDING
      },
      {
        type: actions.VALIDATE_ADDRESS_SUCCESS,
        address: mockData.address,
        valid: true
      }
    ];
    await store.dispatch(actions.checkAddress());
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.post).toHaveBeenCalled();
    jest.restoreAllMocks();
  });

  test('calls failure if the address is invalid', async () => {
    const store = mockStore();
    const mockData = {
      errorField: [
        {
          name: 'zipcode',
          description: 'Field must be present'
        },
        {
          name: 'state',
          description: 'Texas is not a state in the UK.'
        }
      ],
      outcome: 'INVALID'
    };
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: mockData }));
    const expectedActions = [
      {
        type: actions.POST_ADDRESS_PENDING
      },
      {
        type: actions.VALIDATE_ADDRESS_FAILURE,
        error: mockData.errorField,
        valid: false
      }
    ];
    await store.dispatch(actions.checkAddress());
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.post).toHaveBeenCalled();
    jest.restoreAllMocks();
  });

  test('calls failure if axios call fails', async () => {
    const store = mockStore();
    const error = { status: 400, data: { message: 'oh noes!' } };
    mockAxios.post.mockImplementationOnce(() => Promise.reject(error));
    const expectedActions = [
      {
        type: actions.POST_ADDRESS_PENDING
      },
      {
        type: actions.POST_ADDRESS_FAILURE,
        error
      }
    ];
    await store.dispatch(actions.checkAddress());
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.post).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});
