import React from 'react';
import enzyme from 'enzyme';
import { BillingInfoForm } from './BillingInfoForm';
const { t } = global;

describe('BillingInfoForm', () => {
  const submitMock = jest.fn();
  const pushMock = jest.fn();
  const defaultProps = {
    customerType: 'rackspace',
    country: 'US',
    handleSubmit: submitMock,
    history: {
      push: pushMock
    },
    t
  };

  const shallow = (props) => {
    return enzyme.shallow(<BillingInfoForm {...defaultProps} {...props} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('it passes correct props to AddressSection and CurrencySelector', () => {
    const wrapper = shallow();
    const addressProps = wrapper.find('AddressSection').props();
    expect(addressProps.customerType).toEqual(defaultProps.customerType);
  });

  test('back button navigates to address page onClick', () => {
    const push = jest.fn();
    const wrapper = shallow({ history: { push } });
    wrapper.find('Button').first().simulate('click');
    expect(push).toBeCalledWith('/');
  });

  test('next button navigates to address page onClick', () => {
    const push = jest.fn();
    const wrapper = shallow({ history: { push } });
    wrapper.find('form').simulate('submit', { bubbles: true });
    expect(submitMock).toBeCalled();
  });
});
