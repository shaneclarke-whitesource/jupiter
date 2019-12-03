import React from 'react';
import { Field } from 'redux-form';
import Input from '../helix/Input';
import { useTranslation } from 'react-i18next';

const AddressSection = () => {
  const { t } = useTranslation();
  return (
    <div className="address-section">
      <Field
        name="city"
        type="text"
        label={t('common:user.location.city')}
        component={Input}
        required
      />
      <Field
        name="state"
        type="text"
        label={t('common:user.location.state')}
        component={Input}
        required
      />
      <Field
        name="street"
        type="text"
        label={t('common:user.location.street')}
        component={Input}
        required
      />
      <Field
        name="zipcode"
        type="text"
        label={t('common:user.location.zipcode')}
        component={Input}
        required
      />
      <Field
        name="country"
        type="text"
        label={t('common:user.location.country')}
        component={Input}
        required
      />
    </div>
  );
};

export default AddressSection;
