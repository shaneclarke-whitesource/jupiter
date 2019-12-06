import SignUpReduxForm from '../../containers/SignUp/SignUpForm';
import { mountWithProvider, renderWithForm } from '../../../test/provider';
import { t } from '../../../test/i18n/mocks';
import Product from './Product';

describe('Product', () => {
  let wrapper;
  let root;
  beforeEach(() => {
    root = mountWithProvider(SignUpReduxForm, { t });
    wrapper = root.find('Product');
  });

  test('it renders', () => {
    const rendered = renderWithForm(Product, { t }).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('it renders the popover with correct props', () => {
    const popover = wrapper.find('Popover');
    expect(popover.prop('title')).toEqual('Account Product');
    expect(popover.prop('id')).toEqual('product-popover');
    expect(popover.prop('product')).toEqual('None');
    expect(popover.prop('isOpen')).toEqual(null);
  });

  test('the dropdown renders all the options', () => {
    const values = wrapper.find('option').map((val) => val.prop('value'));
    expect(values).toEqual([
      'none',
      'aviator',
      'navigator',
      'serviceBlocks'
    ]);
  });

  test('it renders the Dropdown list', () => {
    const dropdown = wrapper.find('Field').first();
    expect(dropdown.find('hx-select-control').length).toEqual(1);
  });

  test('it does not render the checkboxes if role is not serviceBlocks', () => {
    expect(wrapper.state().product).toEqual('none');
    expect(wrapper.hasClass('serviceBlocks-Checkboxes')).toBeFalsy();
  });

  test('it renders the checkboxes only if selected role is serviceBlocks', () => {
    wrapper.setState({ product: 'serviceBlocks' });
    expect(root.find('.serviceBlocks-Checkboxes').length).toBe(1);
  });

  test('it changes the state when handleChange is called', () => {
    const event = {
      preventDefault: () => {},
      target: { value: 'navigator' }
    };
    wrapper.instance().handleChange(event);
    expect(wrapper.state().product).toEqual('navigator');
    expect(wrapper.state().isOpen).toEqual(null);
    expect(wrapper.state().touched).toBeTruthy();
  });

  test('it sets error to true if none is selected', () => {
    const event = {
      preventDefault: () => {},
      target: { value: 'none' }
    };
    wrapper.instance().handleChange(event);
    expect(wrapper.state().product).toEqual('none');
    expect(wrapper.state().touched).toBeTruthy();
    expect(wrapper.state().error).toBeTruthy();
  });
});
