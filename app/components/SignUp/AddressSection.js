import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, Field, formValueSelector, FormSection, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Input from '../helix/inputTypes/Input';
import CountrySelect from './AddressSelectors/CountrySelect';
import StateSelect from './AddressSelectors/StateSelect';

export class AddressSection extends React.Component {
  render() {
    const { t, country } = this.props;
    return (
      <div className="Input-section">
        <h3>{t('common:account.header.address')}</h3>
        <FormSection name="address">
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    country: formValueSelector('signUp')(state, 'userInfo.address.country')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCountry: (country) => {
      dispatch(change('signUp', 'userInfo.address.country', country));
    }
  };
};

AddressSection.propTypes = {
  t: PropTypes.func.isRequired,
  country: PropTypes.string,
  setCountry: PropTypes.func
};

AddressSection.defaultProps = {
  country: ''
};

const AddressSectionReduxForm = reduxForm({
  form: 'signUp',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(withTranslation()(AddressSection));

export default connect(mapStateToProps, mapDispatchToProps)(AddressSectionReduxForm);
