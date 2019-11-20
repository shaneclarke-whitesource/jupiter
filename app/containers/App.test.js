import React from 'react';
import renderer from 'react-test-renderer';
import { App } from './App';
import { t } from '../../test/i18n/mocks';

describe('App', () => {
  test('renders', () => {
    const component = renderer.create(<App t={t} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('renders the document title', () => {
    expect(global.window.document.title).toEqual('Rackspace Invoice Sign Up');
  });
});
