import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { FormSection, reduxForm } from 'redux-form';
import { validateUser, asyncValidate } from '../../validators';
import { clearResult, submitUserData } from '../../actions/signUpUser';
import _ from 'lodash';
import { CUSTOMER_SIGNUP_REQUEST } from '../../signupReqFormat/customer';
import { RBU_SIGNUP_REQUEST } from '../../signupReqFormat/rbuCustomer';
import AddressSection from '../../components/SignUp/AddressSection';
import Submit from '../../components/helix/buttons/Submit';
import UserInfo from '../../components/SignUp/UserInfo';
import CustomerType from '../../components/SignUp/CustomerType';
import SubmissionModal from '../../components/SignUp/SubmissionModal';
import Product from '../../components/SignUp/Product';

export class SignUpForm extends React.Component {
  formatRequest = (values) => {
    const template = (
      _.get(values, ['userInfo', 'customerType', 'isRbu'])
        ? RBU_SIGNUP_REQUEST
        : CUSTOMER_SIGNUP_REQUEST
    );
    return {
      ...template,
      accountName: values.userInfo.accountName,
      externalId: (values.userInfo.productType).toUpperCase(),
      serviceLevel: 'MANAGED',
      contacts: {
        contact: [
          {
            firstName: values.userInfo.firstName,
            lastName: values.userInfo.lastName,
            title: values.userInfo.title,
            addresses: {
              address: [
                {
                  ...values.userInfo.address,
                  primary: true
                }
              ]
            },
            emailAddresses: {
              emailAddress: [
                {
                  address: values.userInfo.email,
                  primary: true
                }
              ]
            },
            phoneNumbers: {
              phoneNumber: [
                {
                  country: values.userInfo.address.country,
                  number: values.userInfo.phoneNumber.number,
                  category: 'HOME',
                  primary: true
                }
              ]
            },
            user: {
              username: values.userInfo.username,
              password: values.userInfo.password
            },
            roles: template.contacts.contact[0].roles
          }
        ]
      }
    };
  };

  handleSubmit = (values) => {
    const toSubmit = this.formatRequest(values);
    this.props.signUp(toSubmit);
  };

  closeModal = () => {
    this.props.clearResult();
  };

  render() {
    const { t, handleSubmit, result, pending } = this.props;
    return (
      <div className="SignUp-form">
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="InputField-content">
            <FormSection name="userInfo">
              <UserInfo />
              <hr />
              <Product />
              <hr />
              <h2>{t('common:account.customer.info')}</h2>
              <FormSection name="customerType">
                <CustomerType />
              </FormSection>
              <AddressSection />
            </FormSection>
          </div>
          <div className="SignUp-buttons">
            <Submit
              label={t('common:actions.basic.submit')}
              disabled={pending}
              processing={pending}
            />
          </div>
        </form>
        <SubmissionModal openModal={result} hideModal={this.closeModal} />
      </div>
    );
  }
}

SignUpForm.propTypes = {
  t: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  clearResult: PropTypes.func.isRequired,
  result: PropTypes.bool.isRequired
};

export const validateForm = (values, props) => {
  return {
    ...validateUser(values, props)
  };
};

const mapStateToProps = (state) => {
  return {
    pending: state.signUpResponse.pending,
    result: !!(!state.signUpResponse.pending && (state.signUpResponse.success || state.signUpResponse.error))
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (value) => {
      dispatch(submitUserData(value));
    },
    clearResult: (value) => {
      dispatch(clearResult(value));
    }
  };
};

const SignUpReduxForm = reduxForm({
  form: 'signUp',
  validate: validateForm,
  asyncValidate,
  asyncBlurFields: ['userInfo.username'],
  enableReinitialize: true,
  touchOnBlur: false,
  touchOnChange: true
})(withTranslation()(SignUpForm));


export default connect(mapStateToProps, mapDispatchToProps)(SignUpReduxForm);
