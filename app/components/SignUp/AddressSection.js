import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, Field, formValueSelector } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Input from '../helix/Input';
import CountrySelect from './AddressSelectors/CountrySelect';
import StateSelect from './AddressSelectors/StateSelect';

export class AddressSection extends React.Component {
  onCountryChange = (country) => {
    this.props.setCountry(country);
  };

  render() {
    const { t, country } = this.props;
    return (
      <div className="Input-section">
        <h2>{t('common:account.header.address')}</h2>
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
          name="zipcode"
          type="text"
          label={t('common:user.location.zipcode')}
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
              id="country-select-dropdown"
              country={country || ''}
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
              id="state-select-dropdown"
              country={country || ''}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    country: formValueSelector('signUp')(state, 'address.country')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCountry: (country) => {
      dispatch(change('signUp', 'address.country', country));
    }
  };
};

AddressSection.propTypes = {
  t: PropTypes.func.isRequired,
  country: PropTypes.string,
  setCountry: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddressSection));
