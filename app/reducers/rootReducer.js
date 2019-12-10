import { combineReducers } from 'redux';
import signUpReducer from './signUpReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  form: formReducer,
  userInfo: signUpReducer
});
