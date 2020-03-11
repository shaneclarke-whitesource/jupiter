import { renderWithForm, mountWithForm } from '../../../test/provider';
import { t } from '../../../test/i18n/mocks';
import { Product } from './Product';

describe('Product', () => {
  const clearRbuMock = jest.fn();
  const defaultProps = {
    clearRbu: clearRbuMock,
    formProductType: 'aws',
    t
  };
  const mounted = (props) => {
    const newProps = { ...defaultProps, ...props };
    return mountWithForm(Product, { ...newProps });
  };

  test('it renders', () => {
    const rendered = renderWithForm(Product, { ...defaultProps }).toJSON();
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
    expect(wrapper.find('.product').text()).toEqual('Amazon Web Services');
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
    expect(wrapper.find('.product').text()).toEqual('Google Cloud Platform');
    expect(clearRbuMock).toHaveBeenCalled();
  });

  test('it shows the notSelected if formProductType is an empty string', () => {
    const wrapper = mounted({ formProductType: '' });
    expect(wrapper.find('.product').text()).toEqual('--');
  });

  test('it passes the an error if a product is not selected', () => {
    const wrapper = mounted();
    const event = {
      target: {
        value: 'notSelected'
      }
    };
    wrapper.find('option[value="notSelected"]').simulate('change', event);
    expect(wrapper.find('Popover').prop('error')).toBeTruthy();
  });
});
