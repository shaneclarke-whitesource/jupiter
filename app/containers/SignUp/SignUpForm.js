import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/helix/Input';
import Button from '../../components/helix/Button';
import { withTranslation } from 'react-i18next';

class SignUpForm extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="SignUp-form">
        <div className="InputField-content">
          <div className="hxRow">
            <div className="hxCol hxSpan-6">
              <Input id="firstName" label={t('common:user.details.firstName')} required />
            </div>
            <div className="hxCol hxSpan-6">
              <Input id="lastName" label={t('common:user.details.lastName')} required />
            </div>
            <div className="hxCol hxSpan-12">
              <Input id="email" label={t('common:user.details.email')} required />
            </div>
            <div className="hxCol hxSpan-12">
              <Input id="username" label={t('common:actions.create.username')} required />
            </div>
            <div className="hxCol hxSpan-12">
              <Input id="password" label={t('common:actions.create.password')} required />
            </div>
            <div className="hxCol hxSpan-12">
              <Input id="confirm" label={t('common:actions.confirm.password')} required />
            </div>
          </div>
        </div>
        <div className="SignUp-buttons">
          <Button classNames="submit-btn hxPrimary" label={t('common:actions.basic.submit')} />
          <Button classNames="cancel-btn hxTertiary" label={t('common:actions.basic.cancel')} />
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(SignUpForm);
