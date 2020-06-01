import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserInfo from '../components/SignUp/UserInfo';
import AddressSection from '../components/SignUp/AddressSection';
import Product from '../components/SignUp/Product';

const SignupRoutes = () => (
  <Switch>
    <Route exact path="/" component={Product} />
    <Route path="/address" component={AddressSection} />
    <Route path="/user-detail" component={UserInfo} />
  </Switch>
);

export default SignupRoutes;
