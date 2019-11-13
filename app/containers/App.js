import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

export class App extends React.Component {
  componentDidMount() {
    const { t } = this.props;
    window.document.title = t('common:headers.main.signUp');
  }

  render() {
    const { t } = this.props;
    return (
      <div id="stage" className="main-body">
        <main id="jupiter-content">
          <h1>{t('common:headers.main.helloWorld')}</h1>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(App);
