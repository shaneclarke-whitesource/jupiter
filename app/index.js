import 'helix-ui/dist/css/helix-ui.css';
import './index.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Routes from './router';
import HelixUI from 'helix-ui';
import './i18n';

const initializeJupiter = () => {
  const content = (
    <Provider store={configureStore()}>
      <Routes />
    </Provider>
  );
  render(content, document.getElementById('jupiter'));
};

HelixUI.initialize().then(initializeJupiter);
