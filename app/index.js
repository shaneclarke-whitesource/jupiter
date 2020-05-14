import 'helix-ui/dist/css/helix-ui.css';
import './index.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './containers/App';
import HelixUI from 'helix-ui';
import './i18n';

const initializeJupiter = () => {
  const content = (
    <Provider store={configureStore()}>
      <div className="jupiter-wrapper">
        <Router>
          <App />
        </Router>
      </div>
    </Provider>
  );
  render(content, document.getElementById('jupiter'));
};

HelixUI.initialize().then(initializeJupiter);
