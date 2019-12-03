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
    expect(wrapper.find('Input').at(0).prop('label')).toEqual('First Name');
    expect(wrapper.find('Input').at(1).prop('label')).toEqual('Last Name');
    expect(wrapper.find('Input').at(2).prop('label')).toEqual('Email Address');
    expect(wrapper.find('Input').at(3).prop('label')).toEqual('Create Username');
    expect(wrapper.find('PasswordInput').first().prop('label')).toEqual('Create Password');
    expect(wrapper.find('PasswordInput').last().prop('label')).toEqual('Confirm Password');
  });
});
