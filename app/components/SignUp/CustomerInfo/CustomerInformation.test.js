import React from 'react';
import { mountWithForm } from '../../../../test/provider';
import { t } from '../../../../test/i18n/mocks';
import { CustomerInformation } from './CustomerInformation';
import enzyme from 'enzyme';

describe('CustomerInformation', () => {
  const setAddressMock = jest.fn();
  const clearProductMock = jest.fn();
  const defaultProps = {
    handleSubmit: jest.fn(),
    valid: false,
    customerType: '',
    setAddress: setAddressMock,
    clearProduct: clearProductMock,
    t
  };

  const mounted = (props) => {
    return mountWithForm(CustomerInformation, {
      defaultProps,
      props,
      withRouter: true
    });
  };

  const shallow = (props) => {
    return enzyme.shallow(<CustomerInformation {...defaultProps} {...props} />);
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
    wrapper.find('Button').simulate('click');
    expect(push).toBeCalledWith('/billing');
  });

  test('next button is disabled if form is not valid', () => {
    const wrapper = shallow({ valid: false }).find('Button');
    expect(wrapper.prop('disabled')).toBeTruthy();
  });
});
