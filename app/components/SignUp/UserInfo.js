import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import _ from 'lodash';
import { withTranslation } from 'react-i18next';
import Input from '../helix/inputTypes/Input';
import PhoneField from '../helix/inputTypes/PhoneField';
import PasswordInput from '../helix/inputTypes/PasswordInput';
import UserName from './UserName';
import { checkUsername } from '../../actions/checkUsername';
import SubmissionModal from './SubmissionModal';
import Submit from '../helix/buttons/Submit';
import { asyncValidate, validateUser } from '../../validators';
import { clearResult, submitUserData } from '../../actions/signUpUser';

export class UserInfo extends React.Component {
  generateUsername = _.debounce(() => {
    const { firstName, lastName, checkIfExists } = this.props;
    // combine their first name, last name and generate some random string suffix
    const first = firstName.trim().substring(0, 2);
    const last = lastName.trim().substring(0, 2);
    const suffix = (Math.random() + 1).toString().slice(2).substring(0, 4);
    const concatUsername = `${(`${first}${last}`).toLowerCase()}.${suffix}`;
    checkIfExists(concatUsername);
  }, 100);

  componentDidUpdate(prevProps) {
    if (this.props.firstName && this.props.lastName) {
      if (this.props.firstName !== prevProps.firstName || this.props.lastName !== prevProps.lastName) {
        this.generateUsername();
      }
    }
  }

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
      <div className="Input-section">
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <h2>{t('common:account.header.userInfo')}</h2>
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
              name="title"
              component={Input}
              type="text"
              label={t('common:user.details.title')}
            />
          </div>
          <UserName />
          <div className="hxCol hxSpan-12">
            <Field
              name="accountName"
              component={Input}
              type="text"
              label={t('common:user.details.accountName')}
              required
            />
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
              name="phoneNumber"
              id="phoneNumber"
              component={PhoneField}
              label={t('common:user.details.phoneNumber')}
              required
            />
          </div>
          <div className="hxCol hxSpan-12">
            <Field
              name="password"
              component={PasswordInput}
              label={t('common:actions.create.password')}
              tooltip
              required
            />
          </div>
          <div className="hxCol hxSpan-12">
            <Field
              name="passwordValidate"
              component={PasswordInput}
              label={t('common:actions.confirm.password')}
              required
            />
          </div>
          <Submit
            label={t('common:actions.basic.submit')}
            disabled={pending}
            processing={pending}
          />
        </form>
        <SubmissionModal openModal={result} hideModal={this.closeModal} />
      </div>
    );
  }
}

UserInfo.propTypes = {
  t: PropTypes.func.isRequired,
  checkIfExists: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  clearResult: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  result: PropTypes.bool,
  pending: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    firstName: formValueSelector('signUp')(state, 'firstName'),
    lastName: formValueSelector('signUp')(state, 'lastName')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkIfExists: (username) => {
      dispatch(checkUsername(username));
    },
    signUp: (value) => {
      dispatch(submitUserData(value));
    },
    clearResult: (value) => {
      dispatch(clearResult(value));
    }
  };
};

export const validate = (values, props) => {
  return {
    ...validateUser(values, props)
  };
};

const UserInfoReduxForm = reduxForm({
  form: 'signUp',
  validate,
  asyncValidate,
  asyncBlurFields: ['username', 'password'],
  touchOnBlur: false,
  touchOnChange: true,
  enableReinitialize: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(withTranslation()(UserInfo));

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserInfoReduxForm));
