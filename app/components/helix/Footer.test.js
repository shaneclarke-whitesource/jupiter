import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './Footer';
import { t } from '../../../test/i18n/mocks';

describe('Footer', () => {
  test('it renders', () => {
    const component = renderer.create(<Footer t={t} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
