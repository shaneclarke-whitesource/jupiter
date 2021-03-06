import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Footer from '../components/helix/Footer';
import SignUpSection from './SignUpSection';
import SignupRoutes from '../router/signup';

export class App extends React.Component {
  componentDidMount() {
    const { t } = this.props;
    window.document.title = t('common:headers.main.signUp');
  }

  render() {
    const { t } = this.props;
    return (
      <>
        <div id="app" className="u-flex-grow">
          <div id="stage" className="jupiter-content">
            <main role="main" id="content" className="main-body">
              <div className="SignUp-container hxSpan-7-lg hxSpan-9-sm hxSpan-11-xs">
                <div className="SignUp-header">
                  <h1>{t('common:signUp.headers.main')}</h1>
                  <hr />
                </div>
                <SignUpSection>
                  <SignupRoutes />
                </SignUpSection>
              </div>
            </main>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

App.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(App);
