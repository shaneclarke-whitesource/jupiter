import React from 'react';
import SignUpReduxForm from '../../containers/SignUp/SignUpForm';
import { mountWithForm, mountWithProvider, renderWithForm } from '../../../test/provider';
import { t } from '../../../test/i18n/mocks';
import { Product } from './Product';

describe('Product', () => {
  let wrapper;
  let mounted;
  beforeEach(() => {
    wrapper = shallow(<Product t={t} />);
    mounted = mountWithForm(Product, { t });
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
    const values = mounted.find('option').map((val) => val.prop('value'));
    expect(values).toEqual([
      'none',
      'aviator',
      'navigator',
      'serviceBlocks'
    ]);
  });

  test('it renders the Dropdown list', () => {
    const dropdown = mounted.find('Field').first();
    expect(dropdown.find('hx-select-control').length).toEqual(1);
  });

  test('it does not render the checkboxes if role is not serviceBlocks', () => {
    expect(wrapper.state().product).toEqual('none');
    expect(wrapper.hasClass('hx-radio-set')).toBeFalsy();
  });

  test('it renders the checkboxes only if selected role is serviceBlocks', () => {
    const root = mountWithProvider(SignUpReduxForm, { t });
    const newWrap = root.find('Product');
    newWrap.setState({ product: 'serviceBlocks' });
    expect(root.find('hx-radio-set').length).toBe(1);
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
