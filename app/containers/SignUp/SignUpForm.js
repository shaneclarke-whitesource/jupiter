import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { FormSection, reduxForm } from 'redux-form';
import { validateUser, validateAddress, validateRole } from '../../validators';
import { submitUserData } from '../../actions/signUpUser';
import _ from 'lodash';
import { CUSTOMER_SIGNUP_REQUEST } from '../../signupReqFormat.js/customer';
import { RBU_SIGNUP_REQUEST } from '../../signupReqFormat.js/rbuCustomer';
import Button from '../../components/helix/buttons/Button';
import AddressSection from '../../components/SignUp/AddressSection';
import Product from '../../components/SignUp/Product';
import Submit from '../../components/helix/buttons/Submit';
import UserInfo from '../../components/SignUp/UserInfo';
import CustomerType from '../../components/SignUp/CustomerType';

// my nested object - given request nested obj

// userInfo.accountName - accountName
// userInfo.firstName - contacts.contact.firstName
// userInfo.lastName - contacts.contact.lastName
// userInfo.title - contacts.contact.title
// userInfo.email - contacts.contact.emailAddresses.emailAddress
// userInfo.username - contacts.contact.user.username
// userInfo.password - contacts.contact.user.password
// userInfo.phoneNumber - contacts.contact.phoneNumbers.phoneNumber
// address - contacts.contact.addresses.address
// userInfo.emailAddress - contacts.contact.emailAddresses.emailAddress

export class SignUpForm extends React.Component {
  formatRequest = (values) => {
    const reqUsed = _.get(values, ['customerType', 'isRbu']) ? RBU_SIGNUP_REQUEST : CUSTOMER_SIGNUP_REQUEST;
    const userContactFields = _.get(reqUsed, ['contacts', 'contact']);
    _.forEach(userContactFields, (reqKey) => {
      return Object.keys(values.contact).forEach((key) => {
        if (reqKey.hasOwnProperty(key)) {
          reqKey[key] = values.contact[key];
        }
      });
    });
  };

  handleSubmit = (values) => {
    this.formatRequest(values);
  };

  render() {
    const { t, handleSubmit } = this.props;
    return (
      <div className="SignUp-form">
        <form onSubmit={handleSubmit(this.handleSubmit)}>
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
            <FormSection name="addesses.address">
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
              onClick={this.props.signUp}
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
