import axios from 'axios';

export const SUBMIT_PENDING = 'SUBMIT_PENDING';
export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';
export const SUBMIT_FAILURE = 'SUBMIT_FAILURE';

export const submitPending = () => {
  return {
    type: SUBMIT_PENDING,
    pending: true
  };
};

export const submitSuccess = (data) => {
  return {
    type: SUBMIT_SUCCESS,
    pending: false,
    data
  };
};

export const submitFailure = (error) => {
  return {
    type: SUBMIT_FAILURE,
    pending: false,
    error: { error }
  };
};

export function submitUserData(values) {
  return (dispatch) => {
    dispatch(submitPending());
    axios.post(
      '/api/signup/v1/',
      { values },
      {
        headers: {
          'Access-Control-Allow-Credentials': true,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        withCredentials: true
      }
    )
      .then((response) => {
        dispatch(submitSuccess(response.data));
      })
      .catch((error) => {
        dispatch(submitFailure());
        throw (error);
      });
  };
}
