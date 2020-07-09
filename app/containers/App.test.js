import React from 'react';
import { App } from './App';
const { t } = global;

describe('App', () => {
  test('renders the document title', () => {
    expect(document.title).toEqual('');
    shallow(<App t={t} />);
    expect(document.title).toEqual('Rackspace Invoice Sign Up');
  });
});
