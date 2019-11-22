import React from 'react';
import _ from 'lodash';
import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as enzyme from 'enzyme';
import { Provider } from 'react-redux';
import SignUpReduxForm from './SignUpForm';
import { t } from '../../../test/i18n/mocks';

describe('SignUpForm', () => {
  test('renders both the Submit and Cancel buttons with appropriate text', () => {
    const store = createStore(combineReducers({ form: formReducer }));
    const wrapper = enzyme.mount((
      <Provider store={store}>
        <SignUpReduxForm t={t} />
      </Provider>
    ));
    const form = wrapper.find('form');
    expect(form.find('.submit-btn').text()).toEqual('Submit');
    expect(form.find('.cancel-btn').text()).toEqual('Cancel');
  });
});
