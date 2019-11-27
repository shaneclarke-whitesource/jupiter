import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Field, FormSection, reduxForm } from 'redux-form';
import Input from '../../components/helix/Input';
import Button from '../../components/helix/Button';
import {
  validatePassword, validateEmail, validateUser, validateAddress
} from '../../validators';
import AddressSection from '../../components/SignUp/AddressSection';
import AccountName from '../../components/SignUp/AccountName';

export class SignUpForm extends React.Component {
  render() {
    const { t, handleSubmit, reset } = this.props;
    console.log(this.props);
    return (
      <div className="SignUp-form">
        <form onSubmit={() => handleSubmit}>
          <div className="InputField-content">
            <div className="hxRow">
              <div className="hxCol hxSpan-6">
                <Field
                  name="firstName"
                  component={Input}
                  type="text"
                  label={t('common:user.details.firstName')}
                  required
                />
              </div>
              <div className="hxCol hxSpan-6">
                <Field
                  name="lastName"
                  component={Input}
                  type="text"
                  label={t('common:user.details.lastName')}
                  required
                />
              </div>
            </div>
            <div className="hxCol hxSpan-12">
              <Field
                name="email"
                component={Input}
                type="text"
                label={t('common:user.details.email')}
                required
              />
            </div>
            <div className="hxCol hxSpan-12">
              <Field
                name="username"
                component={Input}
                type="text"
                label={t('common:actions.create.username')}
                required
              />
            </div>
            <div className="hxCol hxSpan-12">
              <Field
                name="password"
                type="text"
                component={Input}
                label={t('common:actions.create.password')}
                required
              />
            </div>
            <div className="hxCol hxSpan-12">
              <Field
                name="passwordValidate"
                type="text"
                component={Input}
                label={t('common:actions.confirm.password')}
                required
              />
            </div>
          </div>
          <FormSection name="accountName">
            <AccountName />
          </FormSection>
          <FormSection name="address">
            <AddressSection />
          </FormSection>
          <div className="SignUp-buttons">
            <Button
              classNames="submit-btn hxPrimary"
              label={t('common:actions.basic.submit')}
              type="submit"
            />
            <Button
              classNames="cancel-btn hxTertiary"
              label={t('common:actions.basic.cancel')}
              type="reset"
              onClick={reset}
            />
          </div>
        </form>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  t: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func
};

export const validateForm = (values, props) => {
  return {
    ...validateUser(values, props),
    ...validateEmail(values, props),
    ...validatePassword(values, props),
    ...validateAddress(values, props)
  };
};

const SignUpReduxForm = reduxForm({
  form: 'signUp',
  validate: validateForm
})(withTranslation()(SignUpForm));


export default SignUpReduxForm;
