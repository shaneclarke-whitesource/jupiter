import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { formValueSelector, reduxForm, FormSection } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { validateBilling } from '../../../validators';
import AddressSection from './AddressSection';
import CurrencySelector from './CurrencySelector';
import Button from '../../helix/buttons/Button';
import Submit from '../../helix/buttons/Submit';

export class BillingInfoForm extends React.Component {
  onSubmit = () => {
    this.props.history.push('/user-detail');
  };

  render() {
    const { t, handleSubmit, history, customerType, country } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="Input-section u-form">
          <h2>{t('account:billing.header.info')}</h2>
          <FormSection name="billingInfo">
            <AddressSection customerType={customerType} t={t} />
            <CurrencySelector
              customerType={customerType}
              country={country}
              t={t}
            />
          </FormSection>
          <div className="NavButtons">
            <div className="hxRow">
              <div className="hxCol hxSpan-6">
                <Button
                  classNames="btn-wide"
                  label={t('common:actions.basic.back')}
                  onClick={() => history.push('/')}
                />
              </div>
              <div className="hxCol hxSpan-6 align-right">
                <Submit
                  classNames="btn-wide hxBtn hxPrimary"
                  label={t('common:actions.basic.next')}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

BillingInfoForm.propTypes = {
  t: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  customerType: PropTypes.string,
  country: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => {
  return {
    customerType: formValueSelector('signUp')(state, 'customerInfo.customerType'),
    country: formValueSelector('signUp')(state, 'billingInfo.address.country'),
    countryData: state.country.details,
    initialValues: {
      // Creates a form field we use to validate states existence in a country
      countryData: state.country.details,
      billingInfo: {
        address: {
          // enableReinitialize will reset the form's country to null after it is selected
          // Used redefine based on redux
          country: state.country.details.code
        }
      }
    }
  };
};

const validate = (values, props) => {
  return {
    ...validateBilling(values, props)
  };
};

const BillingReduxForm = reduxForm({
  form: 'signUp',
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(withTranslation()(BillingInfoForm));

export default withRouter(connect(mapStateToProps)(BillingReduxForm));
