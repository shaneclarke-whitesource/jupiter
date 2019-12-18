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
        user: null,
        pending: action.pending,
        success: false,
        error: {}
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        user: action.data,
        pending: action.pending,
        success: true,
        error: {}
      };
    case SUBMIT_FAILURE:
      return {
        ...state,
        user: null,
        pending: action.pending,
        success: false,
        error: action.error.error
      };
    default:
      return state;
  }
}
