import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Input from '../helix/Input';
import PasswordInput from '../PasswordInput';

const UserInfo = ({ t }) => {
  return (
    <div>
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
    </div>
  );
};

UserInfo.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(UserInfo);
