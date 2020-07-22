import {
  POST_ADDRESS_PENDING,
  VALIDATE_ADDRESS_SUCCESS,
  VALIDATE_ADDRESS_FAILURE,
  POST_ADDRESS_FAILURE
} from '../actions/address/validateAddress';

export const INITIAL_STATE = {
  pending: false,
  success: true,
  valid: false,
  errorMsg: [],
  error: false
};

export default function validateAddressReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_ADDRESS_PENDING:
      return {
        ...state,
        pending: true,
        valid: false
      };
    case VALIDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        address: action.address,
        valid: action.valid
      };
    case VALIDATE_ADDRESS_FAILURE:
      return {
        pending: false,
        valid: action.valid,
        errorMsg: action.error
      };
    case POST_ADDRESS_FAILURE:
      return {
        pending: false,
        valid: action.valid,
        errorMsg: action.error
      };
    default:
      return state;
  }
}
