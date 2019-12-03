import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { FormSection, reduxForm } from 'redux-form';
import { validateUser, validateAddress, validateRole } from '../../validators';
import { submitUserData } from '../../actions/signUpUser';
import Button from '../../components/helix/buttons/Button';
import AddressSection from '../../components/SignUp/AddressSection';
import AccountName from '../../components/SignUp/AccountRole';
import Submit from '../../components/helix/buttons/Submit';
import UserInfo from '../../components/SignUp/UserInfo';

export class SignUpForm extends React.Component {
  handleSubmit = (values) => {
    this.props.signUp(values);
  };

  render() {
    const { t, handleSubmit } = this.props;
    return (
      <div className="SignUp-form">
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="InputField-content">
            <h2>{t('common:account.header.userInfo')}</h2>
            <FormSection name="userInfo">
              <UserInfo />
            </FormSection>
            <FormSection name="accountRole">
              <AccountName />
            </FormSection>
            <hr />
            <h2>{t('common:account.header.address')}</h2>
            <FormSection name="address">
              <AddressSection />
            </FormSection>
          </div>
          <div className="SignUp-buttons">
            <Submit
              label={t('common:actions.basic.submit')}
            />
            <Button
              classNames="cancel-btn hxTertiary"
              label={t('common:actions.basic.cancel')}
            />
          </div>
        </form>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  t: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired
};

export const validateForm = (values, props) => {
  return {
    ...validateUser(values, props),
    ...validateAddress(values, props),
    ...validateRole(values, props)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (value) => {
      dispatch(submitUserData(value));
    }
  };
};
const SignUpReduxForm = reduxForm({
  form: 'signUp',
  validate: validateForm
})(withTranslation()(SignUpForm));


export default connect(null, mapDispatchToProps)(SignUpReduxForm);
