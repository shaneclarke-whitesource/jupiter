import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Input from '../helix/inputTypes/Input';
import PhoneField from '../helix/inputTypes/PhoneField';
import PasswordInput from '../helix/inputTypes/PasswordInput';
import UserName from './UserName';
import { checkUsername } from '../../actions/checkUsername';

export class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.generateUsername = this.generateUsername.bind(this);
  }

  generateUsername() {
    const { firstName, lastName, checkIfExists } = this.props;
    // combine their first name, last name and generate some random string suffix
    const first = firstName.trim().substring(0, 2);
    const last = lastName.trim().substring(0, 2);
    const suffix = (Math.random() + 1).toString(36).slice(2).substring(0, 5);
    const concatUsername = firstName && lastName
      ? `${(`${first}${last}`).toLowerCase()}.${suffix}` : '';
    if (concatUsername) {
      checkIfExists(concatUsername);
    }
  }

  render() {
    const { t } = this.props;
    return (
      <section className="Input-section">
        <h2>{t('common:account.header.userInfo')}</h2>
        <div className="hxRow">
          <div className="hxCol hxSpan-6">
            <Field
              name="firstName"
              onBlur={this.generateUsername}
              component={Input}
              type="text"
              label={t('common:user.details.firstName')}
              required
            />
          </div>
          <div className="hxCol hxSpan-6">
            <Field
              name="lastName"
              onBlur={this.generateUsername}
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
      </section>
    );
  }
}

UserInfo.propTypes = {
  t: PropTypes.func.isRequired,
  checkIfExists: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    firstName: formValueSelector('signUp')(state, 'userInfo.firstName'),
    lastName: formValueSelector('signUp')(state, 'userInfo.lastName')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkIfExists: (username) => {
      dispatch(checkUsername(username));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserInfo));
