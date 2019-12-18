import React from 'react';
// import { renderWithForm } from '../../../test/provider';
import { SignUpForm } from './SignUpForm';
import { t } from '../../../test/i18n/mocks';

describe('SignUpForm', () => {
  let wrapper;
  const defaultProps = {
    success: false,
    signUp: jest.fn(),
    pending: false,
    handleSubmit: jest.fn(),
    t
  };
  test('y u do dis', () => {
    expect(true).toEqual(true);
  });
  beforeEach(() => {
    wrapper = shallow(<SignUpForm {...defaultProps} />);
  });

  // test('it renders', () => {
  //   const rendered = renderWithForm(SignUpForm, { ...defaultProps }).toJSON();
  //   expect(rendered).toMatchSnapshot();
  // });

  test('it has the correct headers', () => {
    expect(wrapper.find('h2').text()).toEqual('Customer Information');
  });

  test('it renders all Form Sections', () => {
    expect(wrapper.find('FormSection').length).toEqual(2);
  });
  //
  test('renders both the Submit button text', () => {
    expect(wrapper.find('Submit').prop('label')).toEqual('Submit');
  });
});
