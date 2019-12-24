import React from 'react';
import { SignUpForm } from './SignUpForm';
import { t } from '../../../test/i18n/mocks';
import { mountWithForm } from '../../../test/provider';

describe('SignUpForm', () => {
  let wrapper;
  const clearResultMock = jest.fn();
  const signUpMock = jest.fn();
  const handleSubmitMock = jest.fn();
  const defaultProps = {
    success: false,
    signUp: signUpMock,
    clearResult: clearResultMock,
    pending: false,
    handleSubmit: handleSubmitMock,
    result: false,
    t
  };
  beforeEach(() => {
    wrapper = shallow(<SignUpForm {...defaultProps} />);
  });

  test('it has the correct headers', () => {
    expect(wrapper.find('h2').text()).toEqual('Customer Information');
  });

  test('it renders all Form Sections', () => {
    expect(wrapper.find('FormSection').length).toEqual(2);
  });

  test('renders both the Submit button text', () => {
    expect(wrapper.find('Submit').prop('label')).toEqual('Submit');
  });

  test('it calls handleSubmit when submit is invoked', () => {
    const mounted = mountWithForm(SignUpForm, defaultProps);
    mounted.find('form').simulate('submit');
    expect(handleSubmitMock).toHaveBeenCalled();
  });
});
