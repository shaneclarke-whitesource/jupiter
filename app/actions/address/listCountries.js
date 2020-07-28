import _ from 'lodash';
import { normalize, schema } from 'normalizr';
import { getCustomer } from '../../../lib/axios/signupActions';
import { parseCountry, assertIsArray } from '../../../utils/country';

export const GET_COUNTRIES_PENDING = 'GET_COUNTRIES_PENDING';
export const GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS';
export const GET_COUNTRIES_FAILURE = 'GET_COUNTRIES_FAILURE';

export const getCountriesPending = () => {
  return {
    type: GET_COUNTRIES_PENDING
  };
};

export const getCountriesSuccess = (countries) => {
  return {
    type: GET_COUNTRIES_SUCCESS,
    countryList: countries.entities.countries,
    countryCodes: countries.result.countries
  };
};

export const getCountriesFailure = (errorResponse) => {
  return {
    type: GET_COUNTRIES_FAILURE,
    error: {
      code: errorResponse.status,
      message: errorResponse.data.message
    }
  };
};

const country = new schema.Entity('countries', {}, { idAttribute: 'code' });

export function listCountries() {
  const endpoint = 'countries';
  return (dispatch) => {
    dispatch(getCountriesPending());
    return getCustomer(null, endpoint)
      .then((response) => {
        const countries = assertIsArray(_.get(response.data, ['country']));
        return normalize(
          { countries: _.map(countries, parseCountry) },
          { countries: [country] }
        );
      })
      .then((normalized) => {
        dispatch(getCountriesSuccess(normalized));
      })
      .catch((error) => {
        dispatch(getCountriesFailure(error.response));
      });
  };
}
