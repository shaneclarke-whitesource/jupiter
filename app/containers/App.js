import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Footer from '../components/helix/Footer';
import Breadcrumb from '../components/helix/Breadcrumb';
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
                <div className="hx-row">
                  <div className="hxCol hxSpan-10 hxOffset-1 hxSpan-10-xs">
                    <Breadcrumb
                      breadcrumb={[
                        { [t('common:account.header.detail')]: '/' },
                        { [t('common:account.header.address')]: '/address' },
                        { [t('common:account.header.userInfo')]: '/user-detail' }
                      ]}
                    />
                    <div className="hxCol hxCol hxSpan-11 hxSpan-11-xs">
                      <SignupRoutes />
                    </div>
                  </div>
                </div>
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
