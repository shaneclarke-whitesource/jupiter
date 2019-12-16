import React from 'react';
import { Field, FormSection } from 'redux-form';
import { useTranslation } from 'react-i18next';
import Input from '../helix/inputTypes/Input';
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
      <FormSection name="emailAddresses">
        <div className="hxCol hxSpan-12">
          <Field
            name="email"
            component={Input}
            type="text"
            label={t('common:user.details.email')}
            required
          />
        </div>
      </FormSection>
      <FormSection name="phoneNumbers">
        <div className="hxCol hxSpan-12">
          <Field
            name="phoneNumber"
            id="phoneNumber"
            component={PhoneField}
            label={t('common:user.details.phoneNumber')}
            required
          />
        </div>
      </FormSection>
      <div className="hxCol hxSpan-12">
        <Field
          name="accountName"
          component={Input}
          type="text"
          label={t('common:user.details.accountName')}
          required
        />
      </div>
    </section>
  );
};

export default UserInfo;
