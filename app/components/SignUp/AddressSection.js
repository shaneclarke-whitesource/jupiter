import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, Field, formValueSelector, FormSection, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { validateAddress } from '../../validators';
import Input from '../helix/inputTypes/Input';
import CountrySelect from './AddressSelectors/CountrySelect';
import StateSelect from './AddressSelectors/StateSelect';
import { Context } from '../../containers/Context';
import Button from '../helix/buttons/Button';

export class AddressSection extends React.Component {
  render() {
    const { t, country } = this.props;
    const { history } = this.context;
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
        <div className="NavButtons">
          <div className="hxRow">
            <div className="hxCol hxSpan-6">
              <Button
                classNames="btn-wide"
                onClick={() => history.push('/')}
                type="submit"
                label={t('common:actions.basic.back')}
              />
            </div>
            <div className="hxCol hxSpan-6 align-right">
              <Button
                classNames="btn-wide"
                type="submit"
                onClick={() => history.push('/address')}
                label={t('common:actions.basic.next')}
              />
            </div>
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

AddressSection.defaultProps = {
  country: ''
};

AddressSection.contextType = Context;

const validate = (values, props) => {
  return {
    ...validateAddress(values, props)
  };
};

const AddressSectionReduxForm = reduxForm({
  form: 'signUp',
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(withTranslation()(AddressSection));

export default connect(mapStateToProps, mapDispatchToProps)(AddressSectionReduxForm);
