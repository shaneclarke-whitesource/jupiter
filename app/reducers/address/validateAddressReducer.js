import {
  CHECK_ADDRESS_PENDING,
  CHECK_ADDRESS_SUCCESS,
  CHECK_ADDRESS_FAILURE
} from '../../actions/address/validateAddress';

export const INITIAL_STATE = {
  address: [],
  valid: 'INVALID',
  pending: false
};

export default function validateAddressReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECK_ADDRESS_PENDING:
      return {
        ...state,
        pending: true,
        success: false
      };
    case CHECK_ADDRESS_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        address: action.address,
        valid: action.valid
      };
    case CHECK_ADDRESS_FAILURE:
      return {
        ...state,
        success: false,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}
