import { getCustomer } from '../../../lib/axios/signupActions';

export const CHECK_ADDRESS_PENDING = 'CHECK_ADDRESS_PENDING';
export const CHECK_ADDRESS_SUCCESS = 'CHECK_ADDRESS_SUCCESS';
export const CHECK_ADDRESS_FAILURE = 'CHECK_ADDRESS_FAILURE';

export const checkAddressPending = () => {
  return {
    type: CHECK_ADDRESS_PENDING
  };
};

export const checkAddressSuccess = (address, valid) => {
  return {
    type: CHECK_ADDRESS_SUCCESS,
    address,
    valid
  };
};

export const checkAddressFailure = (errorResponse) => {
  return {
    type: CHECK_ADDRESS_FAILURE,
    error: {
      code: errorResponse.status,
      message: errorResponse.data.message
    }
  };
};


export function checkUserAddress(address) {
  const endpoint = 'address/validations';
  return (dispatch) => {
    dispatch(checkAddressPending());
    return getCustomer(address, endpoint)
      .then((response) => {
        checkAddressSuccess(response.data.address, response.data.outcome);
      })
      .catch((error) => {
        dispatch(checkAddressFailure(error.response));
      });
  };
}
