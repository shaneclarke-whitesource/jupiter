import axios from 'axios';
import { axiosParameters } from '../../../lib/axios/signupActions';

export const POST_ADDRESS_PENDING = 'POST_ADDRESS_PENDING';
export const VALIDATE_ADDRESS_SUCCESS = 'VALIDATE_ADDRESS_SUCCESS';
export const VALIDATE_ADDRESS_FAILURE = 'VALIDATE_ADDRESS_FAILURE';
export const POST_ADDRESS_FAILURE = 'POST_ADDRESS_FAILURE';

export const postAddressPending = () => {
  return {
    type: POST_ADDRESS_PENDING
  };
};

export const validateAddressSuccess = (address) => {
  return {
    type: VALIDATE_ADDRESS_SUCCESS,
    address,
    valid: true
  };
};

export const validateAddressFailure = (error) => {
  return {
    type: VALIDATE_ADDRESS_FAILURE,
    error,
    valid: false
  };
};

export const postAddressFailure = (error) => {
  return {
    type: POST_ADDRESS_FAILURE,
    error
  };
};

export function checkAddress(address) {
  return (dispatch) => {
    dispatch(postAddressPending());
    return axios.post('/api/address/v1/address/validations', { ...address }, { axiosParameters })
      .then((response) => {
        if (response.data.outcome === 'VALID') {
          dispatch(validateAddressSuccess(response.data.address));
        } else {
          dispatch(validateAddressFailure(response.data.errorField));
        }
      })
      .catch((error) => {
        dispatch(postAddressFailure(error));
      });
  };
}
