import React from 'react';
import { renderWithForm, mountWithForm } from '../../../../test/provider';
import { Product } from './Product';
const { t } = global;

describe('Product', () => {
  const defaultProps = {
    customerType: '',
    t
  };

  const shallowWrapper = (props) => {
    return shallow(<Product {...defaultProps} {...props} />);
  };

  test('it renders', () => {
    const rendered = renderWithForm(Product, { defaultProps }).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('dropdown options are disabled if customer type is rbu', () => {
    const { options } = shallowWrapper({ customerType: 'rbu' }).props();
    const disabled = options.map((opts) => opts.disabled);
    expect(disabled).toEqual([
      false,
      true,
      true,
      true,
      false
    ]);
  });

  test('dropdown options are disabled if customer type is onica', () => {
    const { options } = shallowWrapper({ customerType: 'onica' }).props();
    const disabled = options.map((opts) => opts.disabled);
    expect(disabled).toEqual([
      false,
      true,
      true,
      true,
      true
    ]);
  });

  test('dropdown options are disabled if customer type is not rbu', () => {
    const { options } = shallowWrapper({ customerType: 'aws' }).props();
    const disabled = options.map((opts) => opts.disabled);
    expect(disabled).toEqual([
      false,
      false,
      false,
      false,
      false
    ]);
  });

  test('dropdown is disabled if customer type is undefined', () => {
    const wrapperProps = shallowWrapper().props();
    expect(wrapperProps.disabled).toBeTruthy();
  });

  test('dropdown is disabled if customer type has a value', () => {
    const wrapperProps = shallowWrapper({ customerType: 'aws' }).props();
    expect(wrapperProps.disabled).toBeFalsy();
  });

  test('tooltip prop is rendered', () => {
    const mounted = mountWithForm(Product, { defaultProps });
    expect(mounted.find('hx-tooltip').length).toEqual(1);
    expect(mounted.find('hx-tooltip').text()).toEqual('Currently RBU customers only have access to Managed AWS');
  });
});
