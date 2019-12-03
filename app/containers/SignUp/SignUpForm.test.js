import { mountWithProvider, renderWithForm } from '../../../test/provider';
import SignUpReduxForm, { SignUpForm } from './SignUpForm';
import { t } from '../../../test/i18n/mocks';

describe('SignUpForm', () => {
  let wrapper;
  const defaultProps = {
    handleSubmit: jest.fn(),
    reset: jest.fn(),
    t
  };
  beforeEach(() => {
    wrapper = mountWithProvider(SignUpReduxForm, { ...defaultProps });
  });

  test('it renders', () => {
    const rendered = renderWithForm(SignUpForm, { ...defaultProps }).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('it has the correct headers', () => {
    expect(wrapper.find('h2').at(0).text()).toEqual('User Information');
    expect(wrapper.find('h2').at(1).text()).toEqual('Address');
  });

  test('it renders all Form Sections', () => {
    expect(wrapper.find('.user-info-section').length).toEqual(1);
    expect(wrapper.find('.account-role-section').length).toEqual(1);
    expect(wrapper.find('.address-section').length).toEqual(1);
  });

  test('renders both the Submit and Cancel buttons with appropriate text', () => {
    const form = wrapper.find('form');
    expect(form.find('.submit-btn').first().prop('value')).toEqual('Submit');
    expect(form.find('.cancel-btn').last().text()).toEqual('Cancel');
  });
});
