import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { FormSection, reduxForm, Field } from 'redux-form';
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
import PasswordInput from '../../components/helix/inputTypes/PasswordInput';

export class SignUpForm extends React.Component {
  formatRequest = (values) => {
    const isRbu = _.get(values, ['contact', 'customerType', 'isRbu']);
    if (isRbu) {
      return {
        ...RBU_SIGNUP_REQUEST,
        contacts: {
          contact: {
            firstName: values.contact.firstName,
            lastName: values.contact.lastName,
            title: values.contact.title,
            addresses: {
              address: [
                {
                  ...values.contact.addresses.address,
                  primary: true
                }
              ]
            },
            emailAddresses: {
              emailAddress: [
                {
                  address: values.contact.emailAddresses.email,
                  primary: true
                }
              ]
            },
            phoneNumbers: {
              phoneNumber: [
                {
                  country: values.contact.addresses.address.country,
                  number: values.contact.phoneNumber.number,
                  category: 'HOME',
                  primary: true
                }
              ]
            },
            user: {
              username: values.contact.username,
              password: values.contact.user.password
            }
          }
        }
      };
    }

    return {
      ...CUSTOMER_SIGNUP_REQUEST
      // TODO
    };
  };

  handleSubmit = (values) => {
    const toSubmit = this.formatRequest(values);
    this.props.signUp(toSubmit);
  };

  render() {
    const { t, handleSubmit } = this.props;
    return (
      <div className="SignUp-form">
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="InputField-content">
            <FormSection name="contact">
              <UserInfo />
              <FormSection name="user">
                <div className="hxCol hxSpan-12">
                  <Field
                    name="password"
                    component={PasswordInput}
                    label={t('common:actions.create.password')}
                    tooltip
                  />
                </div>
                <div className="hxCol hxSpan-12">
                  <Field
                    name="passwordValidate"
                    component={PasswordInput}
                    label={t('common:actions.confirm.password')}
                  />
                </div>
              </FormSection>
              <hr />
              <Product />
              <FormSection name="customerType">
                <CustomerType />
              </FormSection>
              <hr />
              <FormSection name="addresses">
                <AddressSection />
              </FormSection>
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
