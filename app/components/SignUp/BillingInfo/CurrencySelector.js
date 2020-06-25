import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import SelectorStrip from '../../helix/inputTypes/SelectorStrip';

export const CurrencySelector = ({ t, customerType, country }) => {
  const options = [
    {
      value: 'usd',
      label: t('account:billing.currency.usd'),
      disabled: false
    },
    {
      value: 'cad',
      label: t('account:billing.currency.cad'),
      disabled: customerType !== 'onica' || country !== 'CA'
    }
  ];
  return (
    <div className="CurrencySelector-section">
      <Field
        component={SelectorStrip}
        name="currency"
        selectorName="customerCurrency"
        options={options}
        defaultValue="usd"
        label={t('account:billing.actions.currency.select')}
        required
      />
    </div>
  );
};

CurrencySelector.propTypes = {
  t: PropTypes.func.isRequired,
  country: PropTypes.string,
  customerType: PropTypes.string
};

export default CurrencySelector;
