import axios from 'axios';

export const CHECK_USERNAME_PENDING = 'CHECK_USERNAME_PENDING';
export const CHECK_USERNAME_SUCCESS = 'CHECK_USERNAME_SUCCESS';
export const CHECK_USERNAME_FAILURE = 'CHECK_USERNAME_FAILURE';

export const checkUsernamePending = () => {
  return {
    type: CHECK_USERNAME_PENDING
  };
};

export const checkUsernameSuccess = (username, exists) => {
  return {
    type: CHECK_USERNAME_SUCCESS,
    exists,
    username
  };
};

export const checkUsernameFailure = (errorResponse) => {
  return {
    type: CHECK_USERNAME_FAILURE,
    error: {
      code: errorResponse.status,
      message: errorResponse.data.message
    }
  };
};

export function checkUsername(username) {
  return (dispatch) => {
    dispatch(checkUsernamePending());
    axios.get(
      '/api/signup/v1/cloud-username-check',
      {
        params: { username },
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        withCredentials: true
      }
    )
      .then((response) => {
        dispatch(checkUsernameSuccess(username, response.data.exist));
      })
      .catch((error) => {
        dispatch(checkUsernameFailure(error.response));
        throw (error);
      });
  };
}
