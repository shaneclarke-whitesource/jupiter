import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Footer from '../components/helix/Footer';
import { Context } from './Context';
import SignUpSection from './SignUpSection';

export class App extends React.Component {
  componentDidMount() {
    const { t } = this.props;
    window.document.title = t('common:headers.main.signUp');
  }

  render() {
    const { t, history, location, match } = this.props;
    return (
      <Context.Provider value={{ history, location, match }}>
        <div id="app" className="u-flex-grow">
          <div id="stage" className="jupiter-content">
            <main role="main" id="content" className="main-body">
              <div className="SignUp-container hxSpan-7-lg hxSpan-9-sm hxSpan-11-xs">
                <div className="SignUp-header">
                  <h1>{t('common:signUp.headers.main')}</h1>
                  <hr />
                </div>
                <SignUpSection />
              </div>
            </main>
          </div>
        </div>
        <Footer />
      </Context.Provider>
    );
  }
}

App.propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

App.contextTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
};

export default withTranslation()(App);
