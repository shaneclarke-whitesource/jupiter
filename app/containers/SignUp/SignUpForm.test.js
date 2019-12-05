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
    const headers = wrapper.find('h2').map((label) => label.text());
    expect(headers).toEqual([
      'User Information',
      'Customer Information',
      'Address'
    ]);
  });

  test('it renders all Form Sections', () => {
    expect(wrapper.find('.Input-section').length).toEqual(3);
  });

  test('renders both the Submit and Cancel buttons with appropriate text', () => {
    const form = wrapper.find('form');
    expect(form.find('.submit-btn').first().prop('value')).toEqual('Submit');
    expect(form.find('.cancel-btn').last().text()).toEqual('Cancel');
  });
});
