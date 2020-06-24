import mockAxios from 'axios';
import * as actions from './getCountry';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('actions/getCountry', () => {
  test('it should create an action for pending', () => {
    const expectedAction = {
      type: actions.GET_COUNTRY_PENDING
    };
    expect(actions.getCountryPending()).toEqual(expectedAction);
  });

  test('it should create an action to succeed', () => {
    const country = {
      entities: {
        countries: {
          US: { code: 'test' }
        }
      },
      result: {
        countries: ['US']
      }
    };
    const expectedAction = {
      type: actions.GET_COUNTRY_SUCCESS,
      country
    };
    expect(actions.getCountrySuccess(country)).toEqual(expectedAction);
  });

  test('it should create an action to fail', () => {
    const error = {
      status: 400,
      data: { message: 'oh noes!' }
    };
    const expectedAction = {
      type: actions.GET_COUNTRY_FAILURE,
      error
    };
    expect(actions.getCountryFailure(error)).toEqual(expectedAction);
  });
  describe('async listCountries action', () => {
    let store;
    beforeEach(() => {
      store = mockStore();
    });

    afterEach(async () => {
      jest.restoreAllMocks();
    });

    test('axios calls pending, and success on successful call', async () => {
      const country = {
        code: 'US',
        name: 'United States',
        hasZipCode: true,
        states: { state: [{ name: 'CA' }] }
      };
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: country }));
      const expectedActions = [
        {
          type: actions.GET_COUNTRY_PENDING
        },
        {
          type: actions.GET_COUNTRY_SUCCESS,
          country: {
            countryCode: 'US',
            code: 'US',
            name: 'United States',
            states: [{ name: 'CA' }]
          }
        }
      ];
      await store.dispatch(actions.getCountry('US'));
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalled();
    });

    test('axios calls failure if error occurs', async () => {
      const error = {
        response: {
          status: 401,
          data: { message: 'oh noes!' }
        }
      };
      mockAxios.get.mockImplementationOnce(() => Promise.reject(error));
      const expectedActions = [
        {
          type: actions.GET_COUNTRY_PENDING
        },
        {
          type: actions.GET_COUNTRY_FAILURE,
          error: error.response
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
        store.dispatch(actions.getCountry('AF'));
      });
    });
  });
});
