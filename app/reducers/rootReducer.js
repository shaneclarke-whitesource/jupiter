import { combineReducers } from 'redux';
import getRbuCustomerReducer from './getRbuCustomerReducer';
import signUpReducer from './signUpReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  form: formReducer,
  userInfo: signUpReducer,
  rbuCustomer: getRbuCustomerReducer
});
