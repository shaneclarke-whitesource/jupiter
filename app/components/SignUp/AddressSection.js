import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Input from '../helix/Input';
import { withTranslation } from 'react-i18next';
import CountrySelect from './AddressSelectors/CountrySelect';
import StateSelect from './AddressSelectors/StateSelect';

export class AddressSection extends React.Component {
  state = {
    country: ''
  };

  onCountryChange = (country) => {
    this.setState({ country });
  };

  render() {
    const { t } = this.props;
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
          name="street"
          type="text"
          label={t('common:user.location.street')}
          component={Input}
          required
        />
        <Field
          name="zipCode"
          type="text"
          label={t('common:user.location.zipCode')}
          component={Input}
          required
        />
        <div className="hxRow">
          <div className="hxCol hxSpan-6">
            <Field
              name="country"
              component={CountrySelect}
              valueField="value"
              textField="label"
              label={t('common:user.location.country')}
              id="country-select-popover"
              country={this.state.country}
              onCountryChange={this.onCountryChange}
            />
          </div>
          <div className="hxCol hxSpan-6">
            <Field
              name="state"
              component={StateSelect}
              valueField="value"
              textField="label"
              label={t('common:user.location.state')}
              id="country-select-popover"
              country={this.state.country}
            />
          </div>
        </div>
      </div>
    );
  }
}

AddressSection.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(AddressSection);
