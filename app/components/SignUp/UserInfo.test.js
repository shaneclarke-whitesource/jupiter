import { mountWithProvider, renderWithForm } from '../../../test/provider';
import SignUpReduxForm from '../../containers/SignUp/SignUpForm';
import { t } from '../../../test/i18n/mocks';
import UserInfo from './UserInfo';

describe('AddressSection', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithProvider(SignUpReduxForm, { t }).find('UserInfo');
  });

  test('it renders', () => {
    const rendered = renderWithForm(UserInfo, {}).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('it renders 6 input fields', () => {
    expect(wrapper.find('.InputField').length).toEqual(6);
  });

  test('it renders password and password validate field', () => {
    expect(wrapper.find('PasswordInput').length).toEqual(2);
  });

  test('it renders correct labels', () => {
    const labels = wrapper.find('span').map(label => label.text());
    expect(labels).toContain('First Name');
    expect(labels).toContain('Last Name');
    expect(labels).toContain('Email Address');
    expect(labels).toContain('Create Username');
    expect(labels).toContain('Create Password');
    expect(labels).toContain('Confirm Password');
  });
});
