import * as enzyme from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer, Field, reduxForm } from 'redux-form';
import renderer from 'react-test-renderer';

export function mountWithProvider(Component, props = {}) {
  const store = createStore(combineReducers({ form: formReducer }));
  return enzyme.mount((
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  ));
}

function BaseFieldHOC(Component) {
  return (props) => {
    return (
      <Field
        component={Component}
        name="test"
        {...props}
      />
    );
  };
}

function withForm(Component, props = {}, method) {
  const FormWrapper = reduxForm({ form: 'testForm' })(BaseFieldHOC(Component));
  const store = createStore(combineReducers({ form: formReducer }));
  const func = method === 'create' ? renderer.create : enzyme[method];
  return func((
    <Provider store={store}>
      <FormWrapper {...props} />
    </Provider>
  ));
}

export function renderWithForm(Component, props = {}) {
  return withForm(Component, props, 'create');
}


/**
 * Note: this only works with SFCs
 * in the case of testing component state you must use mountWithProvider
 * and find the component wrapped in the redux form
 * See AddressSection.test.js for reference
 * */
export function mountWithForm(Component, props = {}) {
  return withForm(Component, props, 'mount');
}

export function shallowWithForm(Component, props = {}) {
  return withForm(Component, props, 'shallow');
}
