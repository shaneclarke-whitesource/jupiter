import { mountWithForm, renderWithForm } from '../../../test/provider';
import { t } from '../../../test/i18n/mocks';
import AddressSection from './AddressSection';

describe('AddressSection', () => {
  let wrapper;
  const defaultProps = {
    setCountry: jest.fn(),
    country: 'US',
    t
  };

  beforeEach(() => {
    wrapper = mountWithForm(AddressSection, defaultProps);
  });

  test('it renders', () => {
    const rendered = renderWithForm(AddressSection, {}).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('it renders five fields', () => {
    expect(wrapper.find('.InputField').length).toEqual(5);
  });

  ['city', 'street', 'zipcode', 'country', 'state'].forEach((item, index) => {
    test(`it renders ${item} label`, () => {
      const label = wrapper.find(`label[htmlFor="${item}"]`);
      expect(label.text()).toEqual(
        item.charAt(0).toUpperCase() + item.slice(1)
      );
    });
  });
  test('it changes the country state when onChange is invoked', () => {
    const event = {
      target: {
        value: 'AF'
      }
    };
    wrapper.find('CountryDropdown').simulate('change', event);
    expect(wrapper.find('CountryDropdown').props().value).toEqual('AF');
  });
});
