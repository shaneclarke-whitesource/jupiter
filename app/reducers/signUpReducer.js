import { SUBMIT_PENDING, SUBMIT_SUCCESS, SUBMIT_FAILURE } from '../actions/signUpUser';

export const INITIAL_STATE = {
  user: null,
  pending: false,
  success: false,
  error: {}
};

export default function fetchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_PENDING:
      return {
        ...state,
        pending: action.pending
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        user: action.data,
        pending: action.pending,
        success: true
      };
    case SUBMIT_FAILURE:
      return {
        ...state,
        error: action.error,
        pending: action.pending,
        user: null
      };
    default:
      return state;
  }
}
