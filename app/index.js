import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import 'helix-ui/dist/css/helix-ui.css';
import './index.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './containers/App';
import './i18n';

const initializeJupiter = () => {
  const content = (
    <Provider store={configureStore()}>
      <div id="jupiter-wrapper">
        <App />
      </div>
    </Provider>
  );
  render(content, document.getElementById('jupiter'));
};

initializeJupiter();
