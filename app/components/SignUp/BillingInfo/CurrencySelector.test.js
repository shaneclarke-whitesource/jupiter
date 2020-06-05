import { t } from '../../../../test/i18n/mocks';
import { mountWithForm } from '../../../../test/provider';
import { CurrencySelector } from './CurrencySelector';

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
    expect(options).toEqual(['USD', 'CAD']);
  });

  test('it disables cad currency if customer type is not onica and no country is available', () => {
    const wrapper = mount({ customerType: 'rackspace' });
    const { options } = wrapper.find('SelectorStrip').props();
    expect(options[1].value).toBe('cad');
    expect(options[1].disabled).toBeTruthy();
  });

  test('it disables cad currency if customerType is onica but no country is available', () => {
    const wrapper = mount({ customerType: 'onica' });
    const { options } = wrapper.find('SelectorStrip').props();
    expect(options[1].value).toBe('cad');
    expect(options[1].disabled).toBeTruthy();
  });

  test('it disables cad currency if customerType is onica but country is not US or CA', () => {
    const wrapper = mount({
      customerType: 'onica',
      country: 'JP'
    });
    const { options } = wrapper.find('SelectorStrip').props();
    expect(options[1].value).toBe('cad');
    expect(options[1].disabled).toBeTruthy();
  });

  test('it allows cad currency if customer type is onica and country is US', () => {
    const wrapper = mount({
      customerType: 'onica',
      country: 'US'
    });
    const { options } = wrapper.find('SelectorStrip').props();
    expect(options[1].value).toBe('cad');
    expect(options[1].disabled).toBeFalsy();
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
