import 'helix-ui/dist/css/helix-ui.css';
import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import './i18n';

const initializeJupiter = () => {
  const content = (
    <div id="jupiter-wrapper">
      <App />
    </div>
  );
  render(content, document.getElementById('jupiter'));
};

initializeJupiter();
