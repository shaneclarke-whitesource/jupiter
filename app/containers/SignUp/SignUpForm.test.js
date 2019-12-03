import { mountWithProvider } from '../../../test/provider';
import SignUpReduxForm from './SignUpForm';
import { t } from '../../../test/i18n/mocks';

describe('SignUpForm', () => {
  test('renders both the Submit and Cancel buttons with appropriate text', () => {
    const wrapper = mountWithProvider(SignUpReduxForm, { t });
    const form = wrapper.find('form');
    expect(form.find('.submit-btn').first().prop('value')).toEqual('Submit');
    expect(form.find('.cancel-btn').last().text()).toEqual('Cancel');
  });
});
