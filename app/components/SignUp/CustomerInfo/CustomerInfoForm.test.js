import React from 'react';
import { mountWithForm } from '../../../../test/provider';
import { t } from '../../../../test/i18n/mocks';
import { CustomerInfoForm } from './CustomerInfoForm';
import enzyme from 'enzyme';

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

  const shallow = (props) => {
    return enzyme.shallow(<CustomerInfoForm {...defaultProps} {...props} />);
  };

  it('calls setAddress and clearProduct if target value is rbu', () => {
    const wrapper = mounted();
    const event = {
      target: {
        value: 'rbu'
      }
    };
    wrapper.find('CustomerType').props().handleChange(event);
    wrapper.update();
    expect(clearProductMock).toHaveBeenCalledTimes(1);
    expect(setAddressMock).toHaveBeenNthCalledWith(
      1, 'street', 'Toranomon Hills Mori Tower 7th Floor Toranomon 1-23-1'
    );
  });

  it('it calls setAddress with empty field if value is not rbu', () => {
    const wrapper = mounted();
    const event = {
      target: {
        value: 'aws'
      }
    };
    wrapper.find('CustomerType').props().handleChange(event);
    wrapper.update();
    expect(clearProductMock).toHaveBeenCalledTimes(1);
    expect(setAddressMock).toHaveBeenCalledWith(expect.anything(), '');
  });

  test('next button navigates to address page onClick', () => {
    const push = jest.fn();
    const wrapper = shallow({ history: { push } });
    wrapper.find('Submit').simulate('click');
    expect(submitMock).toHaveBeenCalled();
  });
});
