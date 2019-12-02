import SignUpReduxForm from '../../containers/SignUp/SignUpForm';
import { mountWithProvider, renderWithForm } from '../../../test/provider';
import { t } from '../../../test/i18n/mocks';
import { AccountRole } from './AccountRole';

describe('AccountRole', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithProvider(SignUpReduxForm, { t }).find('AccountRole');
  });

  test('it renders', () => {
    const rendered = renderWithForm(AccountRole, { t }).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('it changes the state when handleChange is called', () => {
    const event = {
      preventDefault: () => {},
      target: { value: 'navigator' }
    };
    wrapper.instance().handleChange(event);
    expect(wrapper.state().selectedRole).toEqual('navigator');
    expect(wrapper.state().isOpen).toEqual(null);
  });

  test('it renders the popover with correct props', () => {
    const popover = wrapper.find('Popover');
    expect(popover.prop('title')).toEqual('Account Role');
    expect(popover.prop('id')).toEqual('role-popover');
    expect(popover.prop('role')).toEqual('Aviator');
    expect(popover.prop('isOpen')).toEqual(null);
  });

  test('the dropdown renders all the options', () => {
    expect(wrapper.find('option').at(0).prop('value')).toEqual('aviator');
    expect(wrapper.find('option').at(1).prop('value')).toEqual('navigator');
    expect(wrapper.find('option').at(2).prop('value')).toEqual('serviceBlocks');
  });

  test('it renders the Dropdown list', () => {
    const dropdown = wrapper.find('Field').first();
    expect(dropdown.find('hx-select-control').length).toEqual(1);
  });

  test('it does not render the checkboxes if role is not serviceBlocks', () => {
    expect(wrapper.state().selectedRole).toEqual('aviator');
    expect(wrapper.hasClass('serviceBlocks-Checkboxes')).toBeFalsy();
  });

  // test('it renders the checkboxes only if selected role is serviceBlocks', () => {
  //   wrapper.setState({ selectedRole: 'serviceBlocks' });
  //   wrapper.instance().forceUpdate();
  //   console.log(wrapper.debug());
  //   // console.log(wrapper.hasClass('serviceBlocks-Checkboxes'));
  // });
});
