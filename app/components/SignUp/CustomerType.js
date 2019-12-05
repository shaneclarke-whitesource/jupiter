import React from 'react';
import { Field } from 'redux-form';
import { useTranslation } from 'react-i18next';
import Checkbox from '../helix/Checkbox';

const CustomerType = () => {
  const { t } = useTranslation();
  return (
    <div className="customer-type-section">
      <div className="hxRow">
        <div className="hxCol hxSpan-4 hxOffset-1">
          <span className="InputField-label customer-info-header hxRequired">
            {t('common:account.customer.type')}
          </span>
        </div>
        <div className="hxCol hxSpan-6">
          <Field
            name="customerType"
            content={t('common:account.customer.isRbu')}
            textField="label"
            id="customer-type"
            component={Checkbox}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerType;
