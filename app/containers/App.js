import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

export class App extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div id="stage" className="main-body u-flex-grow" title={t('common:headers.main.signUp')}>
        <main id="jupiter-content">
          <h1>Hello World</h1>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(App);
