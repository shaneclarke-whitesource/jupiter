import { GET_CUSTOMER_PENDING, GET_CUSTOMER_SUCCESS, GET_CUSTOMER_FAILURE } from '../actions/rbuCustomerInfo';

const INITIAL_STATE = { user: null };
export default function fetchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CUSTOMER_PENDING:
      return {
        ...state,
        pending: action.pending
      };
    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        user: action.data.results,
        pending: action.pending };
    case GET_CUSTOMER_FAILURE:
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
