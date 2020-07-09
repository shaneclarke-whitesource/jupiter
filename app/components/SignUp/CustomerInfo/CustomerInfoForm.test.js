import React from 'react';
import { mountWithForm } from '../../../../test/provider';
import { CustomerInfoForm } from './CustomerInfoForm';
const { t } = global;

describe('CustomerInfoForm', () => {
  const setAddressMock = jest.fn();
  const clearProductMock = jest.fn();
  const submitMock = jest.fn();
  const defaultProps = {
    handleSubmit: submitMock,
    customerType: '',
    setAddress: setAddressMock,
    clearProduct: clearProductMock,
    t
  };

  const mounted = (props) => {
    return mountWithForm(CustomerInfoForm, {
      defaultProps,
      props,
      withRouter: true
    });
  };

  const shallowWrapper = (props) => {
    return shallow(<CustomerInfoForm {...defaultProps} {...props} />);
  };

  it('it calls clearProductMock on change', () => {
    const wrapper = mounted();
    const event = {
      target: {
        value: 'aws'
      }
    };
    wrapper.find('CustomerType').props().handleChange(event);
    wrapper.update();
    expect(clearProductMock).toHaveBeenCalledTimes(1);
  });

  test('next button navigates to address page onClick', () => {
    const push = jest.fn();
    const wrapper = shallowWrapper({ history: { push } });
    wrapper.find('Submit').simulate('click');
    expect(submitMock).toHaveBeenCalled();
  });
});
