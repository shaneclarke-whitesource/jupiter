import { mountWithForm, renderWithForm } from '../../../test/provider';
import { t } from '../../../test/i18n/mocks';
import UserInfo from './UserInfo';

describe('AddressSection', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithForm(UserInfo, { t });
  });

  test('it renders', () => {
    const rendered = renderWithForm(UserInfo, {}).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('it renders 7 input fields', () => {
    expect(wrapper.find('.InputField').length).toEqual(7);
  });

  test('it renders password and password validate field', () => {
    expect(wrapper.find('PasswordInput').length).toEqual(2);
  });

  test('it renders correct labels', () => {
    const labels = wrapper.find('span').map((label) => label.text());
    expect(labels).toEqual([
      'First Name',
      'Last Name',
      'Email Address',
      'Create Username',
      'Create Account Name',
      'Create Password',
      'Confirm Password'
    ]);
  });
});
