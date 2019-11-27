import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Link, Switch, Route } from 'react-router-dom';
import Footer from '../components/helix/Footer';
import SignUpReduxForm from './SignUp/SignUpForm';
import AddressSection from '../components/SignUp/AddressSection';

export class App extends React.Component {
  componentDidMount() {
    const { t } = this.props;
    window.document.title = t('common:headers.main.signUp');
  }

  render() {
    const { t } = this.props;
    return (
      <div id="app">
        <div className="jupiter-content">
          <main role="main" id="content" className="main-body">
            <div className="SignUp-container hxSpan-6-lg hxSpan-8-sm hxSpan-11-xs">
              <div className="SignUp-header">
                <h2>{t('common:signUp.headers.main')}</h2>
                <hr />
              </div>
              <div className="hx-row">
                <div className="hxCol hxSpan-10 hxOffset-1 hxSpan-10-xs">
                  <Switch>
                    <Route path="/" component={SignUpReduxForm} />
                    <Route path="/address-info" component={AddressSection} />
                  </Switch>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(App);
