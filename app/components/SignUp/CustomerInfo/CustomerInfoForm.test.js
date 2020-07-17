import React from 'react';
import { mountWithForm } from '../../../../test/provider';
import { t } from '../../../../test/i18n/mocks';
import { CustomerInfoForm } from './CustomerInfoForm';
import enzyme from 'enzyme';

describe('CustomerInfoForm', () => {
  const setAddressMock = jest.fn();
  const clearProductMock = jest.fn();
  const clearChannelMock = jest.fn();
  const submitMock = jest.fn();
  const defaultProps = {
    handleSubmit: submitMock,
    customerType: '',
    productType: '',
    setAddress: setAddressMock,
    clearProduct: clearProductMock,
    clearChannel: clearChannelMock,
    t
  };

  const mounted = (props) => {
    return mountWithForm(CustomerInfoForm, {
      defaultProps,
      props,
      withRouter: true
    });
  };

  const shallow = (props) => {
    return enzyme.shallow(<CustomerInfoForm {...defaultProps} {...props} />);
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
    const wrapper = shallow({ history: { push } });
    wrapper.find('Submit').simulate('click');
    expect(submitMock).toHaveBeenCalled();
  });
});
