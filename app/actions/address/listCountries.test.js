import mockAxios from 'axios';
import * as actions from './listCountries';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('actions/listCountries', () => {
  test('it should create an action for pending', () => {
    const expectedAction = {
      type: actions.GET_COUNTRIES_PENDING
    };
    expect(actions.getCountriesPending()).toEqual(expectedAction);
  });

  test('it should create an action to succeed', () => {
    const countries = {
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
      type: actions.GET_COUNTRIES_SUCCESS,
      countryList: { 'US': { code: 'test' } },
      countryCodes: ['US']
    };
    expect(actions.getCountriesSuccess(countries)).toEqual(expectedAction);
  });

  test('it should create an action to fail', () => {
    const error = { status: 400, data: { message: 'oh noes!' } };
    const expectedAction = {
      type: actions.GET_COUNTRIES_FAILURE,
      error: {
        code: 400,
        message: 'oh noes!'
      }
    };
    expect(actions.getCountriesFailure(error)).toEqual(expectedAction);
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
      const mockData = {
        country: [
          { code: 'US', name: 'United States' }
        ]
      };
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: mockData }));
      const expectedActions = [
        {
          type: actions.GET_COUNTRIES_PENDING
        },
        {
          type: actions.GET_COUNTRIES_SUCCESS,
          countryCodes: ['US'],
          countryList: {
            'US': {
              code: 'US',
              hasZipCode: false,
              name: 'United States',
              states: undefined
            }
          }
        }
      ];
      await store.dispatch(actions.listCountries());
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalled();
    });

    test('axios calls failure if error occurs', async () => {
      const error = { response: { status: 401, data: { message: 'oh noes!' } } };
      mockAxios.get.mockImplementationOnce(() => Promise.reject(error));
      const expectedActions = [
        {
          type: actions.GET_COUNTRIES_PENDING
        },
        {
          type: actions.GET_COUNTRIES_FAILURE,
          error: {
            code: 401,
            message: 'oh noes!'
          }
        }
      ];
      await store.dispatch(actions.listCountries()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
