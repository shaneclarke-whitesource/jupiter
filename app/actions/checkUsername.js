import axios from 'axios';

export const CHECK_USERNAME_PENDING = 'CHECK_USERNAME_PENDING';
export const CHECK_USERNAME_SUCCESS = 'CHECK_USERNAME_SUCCESS';
export const CHECK_USERNAME_FAILURE = 'CHECK_USERNAME_FAILURE';

export const checkUsernamePending = (username) => {
  return {
    type: CHECK_USERNAME_PENDING,
    username
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

const changeIfExists = (username, exists) => {
  if (exists) {
    const num = username.match(/(\d+)/) + 1;
    return username + num.toString();
  }
  return username;
};

export function checkUsername(username) {
  return (dispatch) => {
    dispatch(checkUsernamePending());
    changeIfExists(username, true);
    axios.get(
      'api/signup/v1/cloud-username-check',
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
        const newUsername = changeIfExists(username, response.data.exist);
        dispatch(checkUsernameSuccess(newUsername, response.data.exist));
      })
      .catch((error) => {
        dispatch(checkUsernameFailure(error.response));
        throw (error);
      });
  };
}
