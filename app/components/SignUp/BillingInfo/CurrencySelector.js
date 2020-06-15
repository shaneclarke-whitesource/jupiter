import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { withTranslation } from 'react-i18next';
import SelectorStrip from '../../helix/inputTypes/SelectorStrip';

export class CurrencySelector extends React.Component {
  render() {
    const { t, customerType, country } = this.props;
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
      },
      {
        value: 'aud',
        label: t('account:billing.currency.aud'),
        disabled: country !== 'AU'
      },
      {
        value: 'eur',
        label: t('account:billing.currency.eur'),
        disabled: false // get european countries?
      },
      {
        value: 'gbp', // somewhere with this info??
        label: t('account:billing.currency.gbp'),
        disabled: false // uk, england, scotland, wales, northern ireland
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
  }
}

CurrencySelector.propTypes = {
  t: PropTypes.func.isRequired,
  country: PropTypes.string,
  customerType: PropTypes.string
};

export default withTranslation()(CurrencySelector);
