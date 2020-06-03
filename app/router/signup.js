import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserInfo from '../components/SignUp/UserDetails/UserInfo';
import CustomerInformation from '../components/SignUp/CustomerInfo/CustomerInformation';
import BillingSection from '../components/SignUp/BillingInfo/BillingSection';

const SignupRoutes = () => (
  <Switch>
    <Route exact path="/" component={CustomerInformation} />
    <Route path="/billing" component={BillingSection} />
    <Route path="/user-detail" component={UserInfo} />
  </Switch>
);

export default SignupRoutes;
