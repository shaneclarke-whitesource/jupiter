import React from 'react';
import { Field } from 'redux-form';
import { useTranslation } from 'react-i18next';
import Input from '../helix/inputTypes/Input';
import PasswordInput from '../helix/inputTypes/PasswordInput';
import PhoneField from '../helix/inputTypes/PhoneField';

const UserInfo = () => {
  const { t } = useTranslation();
  return (
    <section className="Input-section">
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
          optional
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
          name="username"
          component={Input}
          type="text"
          label={t('common:actions.create.username')}
          required
        />
      </div>
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
    </section>
  );
};

export default UserInfo;
