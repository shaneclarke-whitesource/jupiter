import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, Field, FormSection } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Input from '../../helix/inputTypes/Input';
import CountrySelect from './AddressSelectors/CountrySelect';
import StateSelect from './AddressSelectors/StateSelect';

export class AddressSection extends React.Component {
  render() {
    const { t, country } = this.props;
    return (
      <FormSection name="address">
        <Field
          name="street"
          type="text"
          label={t('common:user.location.street')}
          component={Input}
          required
        />
        <Field
          name="city"
          type="text"
          label={t('common:user.location.city')}
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
              country={country}
              onCountryChange={this.props.setCountry}
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
              country={country}
            />
          </div>
        </div>
      </FormSection>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCountry: (country) => {
      dispatch(change('signUp', 'billingInfo.address.country', country));
    }
  };
};

AddressSection.propTypes = {
  t: PropTypes.func.isRequired,
  country: PropTypes.string,
  setCountry: PropTypes.func
};

export default connect(null, mapDispatchToProps)(withTranslation()(AddressSection));
