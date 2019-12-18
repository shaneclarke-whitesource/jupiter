import { SUBMIT_PENDING, SUBMIT_SUCCESS, SUBMIT_FAILURE, CLEAR_RESULT } from '../actions/signUpUser';

export const INITIAL_STATE = {
  user: null,
  pending: false,
  success: false,
  error: {},
  result: false
};

export default function fetchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_PENDING:
      return {
        ...state,
        user: null,
        pending: action.pending,
        success: false,
        error: {},
        result: false
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        user: action.data,
        pending: action.pending,
        success: true,
        error: {},
        result: true
      };
    case SUBMIT_FAILURE:
      return {
        ...state,
        user: null,
        pending: action.pending,
        success: false,
        error: action.error,
        result: true
      };
    case CLEAR_RESULT:
      return {
        ...state,
        user: null,
        pending: false,
        success: false,
        error: {},
        result: false
      };
    default:
      return state;
  }
}
