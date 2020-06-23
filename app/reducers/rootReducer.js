import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signUp from './signUpReducer';
import checkUsername from './checkUsernameReducer';
import getCountries from './listCountriesReducer';
import getCountry from './getCountryReducer';

export default combineReducers({
  form: formReducer,
  signUpResponse: signUp,
  username: checkUsername,
  countries: getCountries,
  country: getCountry
});
