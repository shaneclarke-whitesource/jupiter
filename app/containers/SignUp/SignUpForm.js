import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { FormSection, reduxForm, Field } from 'redux-form';
import { validateUser, validateAddress, validateRole } from '../../validators';
import { submitUserData } from '../../actions/signUpUser';
import _ from 'lodash';
import { CUSTOMER_SIGNUP_REQUEST } from '../../signupReqFormat/customer';
import { RBU_SIGNUP_REQUEST } from '../../signupReqFormat/rbuCustomer';
import Button from '../../components/helix/buttons/Button';
import AddressSection from '../../components/SignUp/AddressSection';
import Submit from '../../components/helix/buttons/Submit';
import UserInfo from '../../components/SignUp/UserInfo';
import CustomerType from '../../components/SignUp/CustomerType';
import PasswordInput from '../../components/helix/inputTypes/PasswordInput';
import Input from '../../components/helix/inputTypes/Input';

export class SignUpForm extends React.Component {
  formatRequest = (values) => {
    const reqUsed = _.get(values, ['customerType', 'isRbu']) ? RBU_SIGNUP_REQUEST : CUSTOMER_SIGNUP_REQUEST;
    const userContactFields = _.get(reqUsed, ['contacts', 'contact']);
    _.filter(userContactFields, (reqKey) => {
      return Object.keys(values.contact).forEach((key) => {
        if (reqKey.hasOwnProperty(key) && typeof reqKey[key] !== 'object') {
          reqKey[key] = values.contact[key];
        } else {
          return _.transform(reqKey[key], (acc, value, nestedKey) => {
            _.filter(reqKey[key][nestedKey], (obj) => {
              _.merge(obj, values.contact[key][nestedKey]);
            });
          });
        }
      });
    });
    reqUsed.accountName = values.contact.accountName;
    reqUsed.contacts.contact[0].user.username = values.contact.user.username;
    return reqUsed;
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
                  <div className="hxCol hxSpan-12">
                    <Field
                      name="username"
                      component={Input}
                      type="text"
                      label={t('common:actions.create.username')}
                      required
                    />
                  </div>
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
