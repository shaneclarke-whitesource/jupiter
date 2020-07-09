import React from 'react';
import { mountWithForm } from '../../../../test/provider';
import { UserInfoForm } from './UserInfoForm';
const { t } = global;

describe('UserInfoForm', () => {
  const submitMock = jest.fn();
  const signupMock = jest.fn();
  const pushMock = jest.fn();
  const defaultProps = {
    customerType: 'rackspace',
    country: 'US',
    handleSubmit: submitMock,
    signUp: signupMock,
    clearResult: jest.fn(),
    history: {
      push: pushMock
    },
    t
  };
  const mounted = (props) => {
    return mountWithForm(UserInfoForm, { defaultProps, props, withRouter: true });
  };

  const shallowWrapper = (props) => {
    return shallow(<UserInfoForm {...defaultProps} {...props} />);
  };

  test('back button navigates to address page onClick', () => {
    const push = jest.fn();
    const wrapper = shallowWrapper({ history: { push } });
    wrapper.find('Button').simulate('click');
    expect(push).toBeCalledWith('/billing');
  });

  test('submit button is disabled if pending is true', () => {
    const wrapper = shallowWrapper({ pending: true }).find('Submit');
    expect(wrapper.prop('disabled')).toBeTruthy();
  });

  test('submit button is not disabled if form is valid and pending is false', () => {
    const wrapper = shallowWrapper({ pending: false }).find('Submit');
    expect(wrapper.prop('disabled')).toBeFalsy();
  });

  test('submit button calls signUp prop', () => {
    const wrapper = mounted();
    wrapper.find('form').simulate('submit');
    expect(submitMock).toBeCalled();
  });
});
