import * as enzyme from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import renderer from 'react-test-renderer';

export function mountWithProvider(Component, props = {}) {
  const store = createStore(combineReducers({ form: formReducer }));
  return enzyme.mount((
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  ));
}

export function renderWithProvider(Component, props = {}) {
  const store = createStore(combineReducers({ form: formReducer }));
  return renderer.create((
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  ));
}
