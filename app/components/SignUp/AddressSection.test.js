import { mountWithProvider, renderWithForm } from '../../../test/provider';
import SignUpReduxForm from '../../containers/SignUp/SignUpForm';
import { t } from '../../../test/i18n/mocks';
import AddressSection from './AddressSection';

describe('AddressSection', () => {
  let root;
  let wrapper;
  beforeEach(() => {
    root = mountWithProvider(SignUpReduxForm, { t });
    wrapper = root.find('AddressSection');
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
      const label = wrapper.find(`label[htmlFor="address.${item}"]`);
      expect(label.text()).toEqual(
        item.charAt(0).toUpperCase() + item.slice(1)
      );
    });
  });
  test('it changes the country state when onChange is invoked', () => {
    const event = {
      target: {
        value: 'US'
      }
    };
    wrapper.find('CountryDropdown').simulate('change', event);
    expect(wrapper.state().country).toEqual('US');
  });
});
