import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Field, FormSection, reduxForm } from 'redux-form';
import Input from '../../components/helix/Input';
import Button from '../../components/helix/Button';
import { validatePassword, validateEmail } from '../../../lib/validators';

class SignUpForm extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="SignUp-form">
        <form onSubmit={this.handleSubmit}>
          <div className="InputField-content">
            <FormSection name="name">
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
            </FormSection>
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
                name="main"
                type="text"
                component={Input}
                label={t('common:actions.create.password')}
                errorMsg={t('common:validation.password.mustMatch')}
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
          <div className="SignUp-buttons">
            <Button
              classNames="submit-btn hxPrimary"
              label={t('common:actions.basic.submit')}
            />
            <Button classNames="cancel-btn hxTertiary" label={t('common:actions.basic.cancel')} />
          </div>
        </form>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  t: PropTypes.func.isRequired
};

const validate = (values) => {
  return {
    ...validatePassword(values),
    ...validateEmail(values)
  };
};

const SignUpReduxForm = reduxForm({
  form: 'signUp',
  validate
})(withTranslation()(SignUpForm));

export default SignUpReduxForm;
