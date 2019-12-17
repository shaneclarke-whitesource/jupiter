import { renderWithForm } from '../../../test/provider';
import { t } from '../../../test/i18n/mocks';
import UserInfo from './UserInfo';

describe('AddressSection', () => {
  // let wrapper;
  // beforeEach(() => {
  //   wrapper = mountWithForm(UserInfo, { t });
  // });

  test('it renders', () => {
    const rendered = renderWithForm(UserInfo, { t }).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  // test('it renders 7 input fields', () => {
  //   expect(wrapper.find('.InputField').length).toEqual(9);
  // });

  // test('it renders password and password validate field', () => {
  //   expect(wrapper.find('PasswordInput').length).toEqual(2);
  // });

  // test('it renders correct labels', () => {
  //   const labels = wrapper.find('.InputField-label').map((label) => label.text());
  //   expect(labels).toEqual([
  //     'First Name',
  //     'Last Name',
  //     'Title',
  //     'Email Address',
  //     'Phone Number',
  //     'Create Username',
  //     'Create Account Name',
  //     'Create Password',
  //     'Confirm Password'
  //   ]);
  // });
});
