import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { withTranslation, Trans } from 'react-i18next';
import SelectorStrip from '../../helix/inputTypes/SelectorStrip';
import Tooltip from '../../helix/Tooltip';

export class CurrencySelector extends React.Component {
  render() {
    const { t, customerType, country, productType } = this.props;
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
        disabled: productType !== 'azure'
      },
      {
        value: 'eur',
        label: t('account:billing.currency.eur'),
        disabled: productType !== 'azure'
      },
      {
        value: 'gbp',
        label: t('account:billing.currency.gbp'),
        disabled: productType !== 'azure'
      }
    ];
    const tooltip = (
      <Tooltip id="currency">
        <Trans defaults={t('account:billing.tips.currency.restrictions')} />
      </Tooltip>
    );
    return (
      <div className="CurrencySelector-section">
        <Field
          component={SelectorStrip}
          name="currency"
          selectorName="customerCurrency"
          options={options}
          defaultValue="usd"
          label={t('account:billing.actions.currency.select')}
          tooltip={tooltip}
          required
        />
      </div>
    );
  }
}

CurrencySelector.propTypes = {
  t: PropTypes.func.isRequired,
  country: PropTypes.string,
  customerType: PropTypes.string,
  productType: PropTypes.string
};

export default withTranslation()(CurrencySelector);
