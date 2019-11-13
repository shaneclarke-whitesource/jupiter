import React from 'react';
import { App } from './App';
import renderer from 'react-test-renderer';
import { t } from '../../test/i18n/mocks';

describe('App', () => {
    it('renders', () => {
        const component = renderer.create(<App t={t} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
