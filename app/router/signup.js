import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserInfo from '../components/SignUp/UserInfo';
import AddressSection from '../components/SignUp/AddressSection';
import CustomerInformation from '../components/SignUp/CustomerInfo/CustomerInformation';

const SignupRoutes = () => (
  <Switch>
    <Route exact path="/" component={CustomerInformation} />
    <Route path="/address" component={AddressSection} />
    <Route path="/user-detail" component={UserInfo} />
  </Switch>
);

export default SignupRoutes;
