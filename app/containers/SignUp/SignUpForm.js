import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { FormSection, reduxForm } from 'redux-form';
import { validateUser, validateAddress, validateRole } from '../../validators';
import Button from '../../components/helix/buttons/Button';
import AddressSection from '../../components/SignUp/AddressSection';
import Product from '../../components/SignUp/Product';
import Submit from '../../components/helix/buttons/Submit';
import UserInfo from '../../components/SignUp/UserInfo';
import CustomerType from '../../components/SignUp/CustomerType';

export class SignUpForm extends React.Component {
  handleSubmit = () => {

  };

  render() {
    const { t, handleSubmit, reset } = this.props;
    return (
      <div className="SignUp-form">
        <form onSubmit={() => handleSubmit}>
          <div className="InputField-content">
            <FormSection name="userInfo">
              <UserInfo />
            </FormSection>
            <hr />
            <FormSection name="accountProduct">
              <Product />
            </FormSection>
            <FormSection name="customerType">
              <CustomerType />
            </FormSection>
            <hr />
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
    ...validateAddress(values, props),
    ...validateRole(values, props)
  };
};

const SignUpReduxForm = reduxForm({
  form: 'signUp',
  validate: validateForm
})(withTranslation()(SignUpForm));


export default SignUpReduxForm;
