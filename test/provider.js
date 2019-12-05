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

export function renderWithForm(Component, props = {}) {
  const FormWrapper = reduxForm({ form: 'testForm' })(BaseFieldHOC(Component));
  const store = createStore(combineReducers({ form: formReducer }));
  return renderer.create((
    <Provider store={store}>
      <FormWrapper {...props} />
    </Provider>
  ));
}
