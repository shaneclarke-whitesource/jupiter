import React from 'react';
import PasswordInput from './PasswordInput';
import renderer from 'react-test-renderer';
import { t } from '../../../../test/i18n/mocks';

describe('PasswordInput', () => {
  const defaultProps = {
    input: {
      name: 'password'
    },
    label: 'Password',
    type: 'password',
    meta: {
      touched: false,
      invalid: false
    },
    t
  };
  test('it renders with correct props', () => {
    const component = renderer.create(<PasswordInput {...defaultProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it does not show error if it has not been touched', () => {
    const wrapper = mount(<PasswordInput {...defaultProps} />);
    expect(wrapper.find('hx-error').length).toBe(0);
  });

  test('it changes password type on click', () => {
    const wrapper = mount(<PasswordInput {...defaultProps} />);
    const button = wrapper.find('button');
    expect(wrapper.find('input').prop('type')).toBe('password');
    button.simulate('click');
    expect(wrapper.find('input').prop('type')).toBe('text');
  });

  test('it changes button text on click', () => {
    const wrapper = mount(<PasswordInput {...defaultProps} />);
    const button = wrapper.find('button');
    expect(button.text()).toBe('Show');
    button.simulate('click');
    expect(button.text()).toBe('Hide');
  });

  describe('password tooltip', () => {
    test('exists tooltip prop is true', () => {
      const wrapper = mount(<PasswordInput {...defaultProps} tooltip />);
      expect(wrapper.find('.tooltip').length).toBeTruthy();
    });
  });

  describe('error state', () => {
    test('shows appropriate error when field has been touched', () => {
      const props = { meta: { touched: true, invalid: true, error: ['Errors Ahoy!', 'Another Error!'] } };
      const wrapper = mount(<PasswordInput {...defaultProps} {...props} />);
      expect(wrapper.find('hx-error').length).toBe(1);
      expect(wrapper.find('hx-error small').text()).toEqual('Errors Ahoy!');
    });

    it('sets hxInvalid class if touched and invalid are true', () => {
      const props = { meta: { touched: true, invalid: true } };
      const wrapper = mount(<PasswordInput {...defaultProps} {...props} />);
      expect(wrapper.find('hx-text-control').prop('class').includes('hxInvalid')).toBeTruthy();
    });

    it('does not set hxInvalid class if only invalid is true', () => {
      const props = { meta: { touched: false, invalid: true } };
      const wrapper = mount(<PasswordInput {...defaultProps} {...props} />);
      expect(wrapper.find('hx-text-control').prop('class').includes('hxInvalid')).toBeFalsy();
    });
  });
});
