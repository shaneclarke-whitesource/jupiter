import React from 'react';
import { App } from './App';
import { t } from '../../test/i18n/mocks';

describe('App', () => {
  test('renders the document title', () => {
    expect(document.title).toEqual('');
    shallow(<App t={t} />);
    expect(document.title).toEqual('Rackspace Invoice Sign Up');
  });
});
