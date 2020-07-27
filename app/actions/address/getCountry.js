import { getCustomer } from '../../../lib/axios/signupActions';
import { parseState } from '../../../utils/country';

export const GET_COUNTRY_PENDING = 'GET_COUNTRY_PENDING';
export const GET_COUNTRY_SUCCESS = 'GET_COUNTRY_SUCCESS';
export const GET_COUNTRY_FAILURE = 'GET_COUNTRY_FAILURE';

export const getCountryPending = () => {
  return {
    type: GET_COUNTRY_PENDING
  };
};

export const getCountrySuccess = (country) => {
  return {
    type: GET_COUNTRY_SUCCESS,
    country
  };
};

export const getCountryFailure = (errorResponse) => {
  return {
    type: GET_COUNTRY_FAILURE,
    error: errorResponse
  };
};

export function getCountry(countryCode) {
  const endpoint = `countries/${countryCode}`;
  return (dispatch) => {
    dispatch(getCountryPending());
    return getCustomer(null, endpoint)
      .then((response) => {
        const country = parseState(response.data, countryCode);
        return dispatch(getCountrySuccess(country));
      }).catch((error) => {
        return dispatch(getCountryFailure(error.response));
      });
  };
}
