import SignUpReduxForm from '../../containers/SignUp/SignUpForm';
import { mountWithProvider, renderWithForm } from '../../../test/provider';
import { t } from '../../../test/i18n/mocks';
import CustomerType from './CustomerType';

describe('CustomerType', () => {
  let wrapper;
  let root;
  beforeEach(() => {
    root = mountWithProvider(SignUpReduxForm, { t });
    wrapper = root.find('CustomerType');
  });
  test('it renders', () => {
    const rendered = renderWithForm(CustomerType, {}).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('it renders the content props in the Checkbox component', () => {
    expect(wrapper.find('label').text()).toEqual('Is this for an RBU customer?');
  });
});
