import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../containers/App';
import AddressSection from '../components/SignUp/AddressSection';
import UserInfo from '../components/SignUp/UserInfo';

const Routes = () => (
  <div className="jupiter-wrapper">
    <Router>
      <Route path="/" component={App} />
      <Route path="/address" component={AddressSection} />
      <Route path="/user-detail" component={UserInfo} />
    </Router>
  </div>
);

export default Routes;
