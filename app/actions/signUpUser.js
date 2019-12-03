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


// dummy setup
export function submitUserData(values) {
  return (dispatch) => {
    dispatch(submitSuccess(values));
  };
}
