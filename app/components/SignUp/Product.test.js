import { renderWithForm, mountWithForm } from '../../../test/provider';
import { t } from '../../../test/i18n/mocks';
import { Product } from './Product';
import enzyme from 'enzyme';
import React from 'react';

describe('Product', () => {
  const clearRbuMock = jest.fn();
  const defaultProps = {
    handleSubmit: jest.fn(),
    clearRbu: clearRbuMock,
    formProductType: 'aws',
    t
  };
  const mounted = (props) => {
    return mountWithForm(Product, { defaultProps, props, withRouter: true });
  };

  const shallow = (props) => {
    return enzyme.shallow(<Product {...defaultProps} {...props} />);
  };

  test('it renders', () => {
    const rendered = renderWithForm(Product, { defaultProps }).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('it sets the label and does not call clearRbu() if the product is aws', () => {
    const wrapper = mounted();
    const event = {
      target: {
        value: 'aws'
      }
    };
    wrapper.find('option[value="aws"]').simulate('change', event);
    expect(clearRbuMock).toHaveBeenCalledTimes(0);
  });

  test('it sets the label and calls clearRbu() if the product is not aws', () => {
    const wrapper = mounted();
    const event = {
      target: {
        value: 'managed_gcp'
      }
    };
    wrapper.find('option[value="managed_gcp"]').simulate('change', event);
    expect(clearRbuMock).toHaveBeenCalled();
  });

  test('back button navigates to address page onClick', () => {
    const push = jest.fn();
    const wrapper = shallow({ history: { push } });
    wrapper.find('Button').simulate('click');
    expect(push).toBeCalledWith('/address');
  });

  test('next button is disabled if form is not valid', () => {
    const wrapper = shallow({ valid: false }).find('Button');
    expect(wrapper.prop('disabled')).toBeTruthy();
  });
});
