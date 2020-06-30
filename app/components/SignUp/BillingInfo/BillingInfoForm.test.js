import React from 'react';
import enzyme from 'enzyme';
import { BillingInfoForm } from './BillingInfoForm';
import { mountWithForm } from '../../../../test/provider';
const { t } = global;

describe('BillingInfoForm', () => {
  const submitMock = jest.fn();
  const pushMock = jest.fn();
  const setAddressMock = jest.fn();
  const getCountryMock = jest.fn();
  const defaultProps = {
    customerType: 'rackspace',
    country: 'US',
    handleSubmit: submitMock,
    setAddress: setAddressMock,
    getCountry: getCountryMock,
    history: {
      push: pushMock
    },
    t
  };

  const shallow = (props) => {
    return enzyme.shallow(<BillingInfoForm {...defaultProps} {...props} />);
  };

  const mounted = (props) => {
    return mountWithForm(BillingInfoForm, {
      defaultProps,
      props,
      withRouter: true
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls setAddress and clearProduct if customerType is rbu', () => {
    const wrapper = mounted({ customerType: 'rbu' });
    wrapper.update();
    expect(setAddressMock).toHaveBeenNthCalledWith(
      1, 'street', 'Toranomon Hills Mori Tower 7th Floor Toranomon 1-23-1'
    );
  });

  it('calls setAddress with empty params if customerType is not rbu', () => {
    const wrapper = mounted({ customerType: 'aws' });
    wrapper.update();
    expect(setAddressMock).toHaveBeenNthCalledWith(1, 'street', '');
  });

  it('calls getCountry with the param JP if customerType is rbu', () => {
    mounted({ customerType: 'rbu' });
    expect(getCountryMock).toHaveBeenCalledWith('JP');
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
