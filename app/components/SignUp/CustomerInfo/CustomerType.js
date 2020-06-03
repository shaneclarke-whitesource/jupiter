import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { useTranslation } from 'react-i18next';
import DropDown from '../../helix/inputTypes/Dropdown';

export const CustomerType = ({ handleChange }) => {
  const { t } = useTranslation();
  const customerTypes = [
    {
      label: t('common:account.customer.type.rackspace'),
      value: 'rackspace'
    },
    {
      label: t('common:account.customer.type.rbu'),
      value: 'rbu'
    },
    {
      label: t('common:account.customer.type.onica'),
      value: 'onica'
    }
  ];
  return (
    <div className="CustomerType-section">
      <div className="hxRow">
        <div className="hxCol hxSpan-12">
          <Field
            name="customerType"
            component={DropDown}
            options={customerTypes}
            defaultValue=""
            valueField="value"
            textField="label"
            label={t('common:account.actions.customer.select')}
            id="customer-select-popover"
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

CustomerType.propTypes = {
  handleChange: PropTypes.func
};

export default CustomerType;
