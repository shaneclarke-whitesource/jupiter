import { callSignup } from './signupAxiosActions';

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

export const checkUsernameFailure = (username, errorResponse) => {
  return {
    type: CHECK_USERNAME_FAILURE,
    username,
    error: {
      code: errorResponse.status,
      message: errorResponse.data.message
    }
  };
};

export function checkUsername(username) {
  const endpoint = 'cloud-username-check';
  return (dispatch) => {
    dispatch(checkUsernamePending());
    return callSignup({ username }, endpoint)
      .then((response) => {
        dispatch(checkUsernameSuccess(username, response.data.exist));
      })
      .catch((error) => {
        // Username must also be passed in failure in order to maintain user field input
        // This avoids reverting the field back to the username generated and set in state on successful call
        dispatch(checkUsernameFailure(username, error.response));
        throw (error);
      });
  };
}
