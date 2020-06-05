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
        label: t('common:account.currency.usd'),
        disabled: false
      },
      {
        value: 'cad',
        label: t('common:account.currency.cad'),
        disabled: customerType !== 'onica' || (country !== 'US' && country !== 'CA')
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
          label={t('common:account.actions.currency.select')}
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
