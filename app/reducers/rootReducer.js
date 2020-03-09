import { combineReducers } from 'redux';
import signUpReducer from './signUpReducer';
import checkUsernameReducer from './checkUsernameReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  form: formReducer,
  signUpResponse: signUpReducer,
  username: checkUsernameReducer
});
