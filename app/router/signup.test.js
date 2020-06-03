import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../containers/App';
import { t } from '../../test/i18n/mocks';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import { Provider } from 'react-redux';
import { Product } from '../components/SignUp/CustomerInfo/Product';
import { AddressSection } from '../components/SignUp/AddressSection';
import { UserInfo } from '../components/SignUp/UserInfo';

const store = createStore(rootReducer);

describe('routes/signup', () => {
  const mounted = (route) => {
    return mount(
      <MemoryRouter initialEntries={[route]}>
        <Provider store={store}>
          <App t={t} />
        </Provider>
      </MemoryRouter>
    );
  };

  it('initial path / routes to Product', () => {
    const wrapper = mounted('/');
    expect(wrapper.find(Product)).toHaveLength(1);
    expect(wrapper.find(AddressSection)).toHaveLength(0);
    expect(wrapper.find(UserInfo)).toHaveLength(0);
  });

  it('path /address routes to Address', () => {
    const wrapper = mounted('/address');
    expect(wrapper.find(Product)).toHaveLength(0);
    expect(wrapper.find(AddressSection)).toHaveLength(1);
    expect(wrapper.find(UserInfo)).toHaveLength(0);
  });

  it('path /user-detail routes to UserInfo', () => {
    const wrapper = mounted('/user-detail');
    expect(wrapper.find(Product)).toHaveLength(0);
    expect(wrapper.find(AddressSection)).toHaveLength(0);
    expect(wrapper.find(UserInfo)).toHaveLength(1);
  });
});
