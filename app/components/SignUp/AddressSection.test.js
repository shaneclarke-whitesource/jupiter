import { mountWithProvider, renderWithForm } from '../../../test/provider';
import SignUpReduxForm from '../../containers/SignUp/SignUpForm';
import { t } from '../../../test/i18n/mocks';
import AddressSection from './AddressSection';

describe('AddressSection', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithProvider(SignUpReduxForm, { t }).find('AddressSection');
  });

  test('it renders', () => {
    const rendered = renderWithForm(AddressSection, {}).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('it renders five fields', () => {
    expect(wrapper.find('.InputField').length).toEqual(5);
  });

  ['city', 'state', 'street', 'zipcode', 'country'].forEach((item, index) => {
    test(`it renders ${item} label`, () => {
      expect(wrapper.find(`[name="${item}"]`)).toBeTruthy();
      expect(wrapper.find('Input').at(index).prop('label')).toEqual(
        item.charAt(0).toUpperCase() + item.slice(1)
      );
    });
  });
});
