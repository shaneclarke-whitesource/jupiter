import { mountWithForm } from '../../../../test/provider';
import { CurrencySelector } from './CurrencySelector';
const { t } = global;

describe('CurrencySelector', () => {
  const defaultProps = {
    country: '',
    customerType: '',
    t
  };

  const mount = (props) => {
    return mountWithForm(CurrencySelector, {
      defaultProps,
      props
    });
  };

  test('it renders correct option labels', () => {
    const wrapper = mount();
    const options = wrapper.find('SelectorStrip').props().options.map((option) => option.label);
    expect(options).toEqual([
      'USD',
      'CAD',
      'AUD',
      'EUR',
      'GBP'
    ]);
  });

  test('it disables cad currency if customer type is not onica and no country is available', () => {
    const wrapper = mount({ customerType: 'rackspace' });
    const { options } = wrapper.find('SelectorStrip').props();
    expect(options[1].value).toBe('cad');
    expect(options[1].disabled).toBeTruthy();
  });

  describe('disabled currency cases for aud, gbp and eur', () => {
    const wrapper = mount({
      customerType: 'onica',
      productType: 'aws',
      country: 'CA'
    });
    const { options } = wrapper.find('SelectorStrip').props();
    ['aud', 'gbp', 'eur'].forEach((field) => {
      test(`${field} is disabled when product type is not azure`, () => {
        expect(options.find((opt) => opt.value === field).disabled).toBeTruthy();
      });
    });
  });

  describe('enabled currency cases for aud, gbp and eur', () => {
    const wrapper = mount({
      customerType: 'rackspace',
      productType: 'azure',
      country: 'CA'
    });
    const { options } = wrapper.find('SelectorStrip').props();
    ['aud', 'gbp', 'eur'].forEach((field) => {
      test(`${field} is not disabled when product type is azure`, () => {
        expect(options.find((opt) => opt.value === field).disabled).toBeFalsy();
      });
    });
  });

  describe('currency cases for cad', () => {
    test('it disables cad currency if customerType is onica but no country is available', () => {
      const wrapper = mount({ customerType: 'onica' });
      const { options } = wrapper.find('SelectorStrip').props();
      expect(options[1].value).toBe('cad');
      expect(options[1].disabled).toBeTruthy();
    });

    test('it disables cad currency if customerType is onica but country is not CA', () => {
      const wrapper = mount({
        customerType: 'onica',
        country: 'JP'
      });
      const { options } = wrapper.find('SelectorStrip').props();
      expect(options[1].value).toBe('cad');
      expect(options[1].disabled).toBeTruthy();
    });

    test('it allows cad currency if customer type is onica and country is CA', () => {
      const wrapper = mount({
        customerType: 'onica',
        country: 'CA'
      });
      const { options } = wrapper.find('SelectorStrip').props();
      expect(options[1].value).toBe('cad');
      expect(options[1].disabled).toBeFalsy();
    });
  });
});
