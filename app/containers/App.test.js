import { App } from './App';
import { mountWithProvider } from '../../test/provider';
import { t } from '../../test/i18n/mocks';

describe('App', () => {
  test('renders the document title', () => {
    mountWithProvider(App, { t });
    expect(document.title).toEqual('Rackspace Invoice Sign Up');
  });
});
