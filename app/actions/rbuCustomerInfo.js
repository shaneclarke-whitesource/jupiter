import axios from 'axios';
import { submitFailure, submitPending, submitSuccess } from './signUpUser';

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

const token = 'cf4dbd4b-a963-4843-ba3c-53ff598825e2';
// dummy setup/url
export function handleSubmit() {
  return (dispatch) => {
    return axios.get(
      'https://portal.rackspace.com/api/admin/routes',
      {
        headers: {
          'Access-Control-Allow-Origin': 'localhost:3000',
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          Cookie: '__Secure-portal_sessionid=cf4dbd4b-a963-4843-ba3c-53ff598825e2;'
        },
        withCredentials: true,
      }
    )
      .then((response) => {
        console.log(response);
        dispatch(submitPending());
        dispatch(submitSuccess(response.data));
      })
      .catch((error) => {
        dispatch(submitFailure());
        throw (error);
      });
  };
}
