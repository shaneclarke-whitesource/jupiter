import { CHECK_USERNAME_FAILURE, CHECK_USERNAME_SUCCESS, CHECK_USERNAME_PENDING } from '../actions/checkUsername';

export const INITIAL_STATE = {
  username: '',
  pending: false,
  exists: false,
  success: false,
  error: true
};

export default function checkUsernameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECK_USERNAME_PENDING:
      return {
        ...state,
        username: action.username,
        pending: true
      };
    case CHECK_USERNAME_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        exists: true,
        username: action.username
      };
    case CHECK_USERNAME_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
