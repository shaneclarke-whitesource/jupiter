import React from 'react';
import renderer from 'react-test-renderer';
import { App } from './App';
import { t } from '../../test/i18n/mocks';

describe('App', () => {
  it('renders', () => {
    const component = renderer.create(<App t={t} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
