import React from 'react';
import { t } from '../../../../test/i18n/mocks';
import enzyme from 'enzyme';
import { mountWithForm } from '../../../../test/provider';
import { BillingInfoForm } from './BillingInfoForm';

describe('BillingInfoForm', () => {
  const submitMock = jest.fn();
  const pushMock = jest.fn();
  const defaultProps = {
    customerType: 'rackspace',
    country: 'US',
    handleSubmit: submitMock,
    valid: false,
    history: {
      push: pushMock
    },
    t
  };

  const mounted = (props) => {
    return mountWithForm(BillingInfoForm, { defaultProps, props, withRouter: true });
  };

  const shallow = (props) => {
    return enzyme.shallow(<BillingInfoForm {...defaultProps} {...props} />);
  };

  test('it passes correct props to AddressSection and CurrencySelector', () => {
    const wrapper = mounted();
    const addressProps = wrapper.find('AddressSection').props();
    expect(addressProps.customerType).toEqual(defaultProps.customerType);
    expect(addressProps.country).toEqual(defaultProps.country);
    const currencyProps = wrapper.find('CurrencySelector').props();
    expect(currencyProps.customerType).toEqual(defaultProps.customerType);
    expect(currencyProps.country).toEqual(defaultProps.country);
  });

  test('back button navigates to address page onClick', () => {
    const push = jest.fn();
    const wrapper = shallow({ history: { push } });
    wrapper.find('Button').first().simulate('click');
    expect(push).toBeCalledWith('/');
  });

  test('next button is disabled if form is not valid', () => {
    const wrapper = shallow({ valid: false }).find('Submit');
    expect(wrapper.prop('disabled')).toBeTruthy();
  });

  test('next button navigates to address page onClick', () => {
    const push = jest.fn();
    const wrapper = shallow({ history: { push } });
    wrapper.find('form').simulate('submit');
    expect(submitMock).toBeCalled();
  });

  test('navigates to user-detail onSubmit', () => {
    const wrapper = shallow();
    wrapper.find('Submit').simulate('click');
    expect(pushMock).toBeCalledWith('/user-detail');
  });
});
