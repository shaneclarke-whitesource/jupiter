import axios from 'axios';

export const GET_CUSTOMER_PENDING = 'GET_CUSTOMER_PENDING';
export const GET_CUSTOMER_SUCCESS = 'GET_CUSTOMER_SUCCESS';
export const GET_CUSTOMER_FAILURE = 'GET_CUSTOMER_FAILURE';

export const getCustomerPending = () => {
  return {
    type: GET_CUSTOMER_PENDING,
    pending: true
  };
};

export const getCustomerSuccess = (data) => {
  return {
    type: GET_CUSTOMER_SUCCESS,
    pending: false,
    data
  };
};

export const getCustomerFailure = (error) => {
  return {
    type: GET_CUSTOMER_FAILURE,
    pending: false,
    error: { error }
  };
};

// dummy setup/url
export function getRbuCustomerDetails() {
  return (dispatch) => {
    return axios.get('https://randomuser.me/api/?results=10')
      .then((response) => {
        dispatch(getCustomerPending());
        dispatch(getCustomerSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getCustomerFailure());
        throw (error);
      });
  };
}
