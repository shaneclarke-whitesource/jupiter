import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { formValueSelector, reduxForm, FormSection } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { validateBilling } from '../../../validators';
import AddressSection from './AddressSection';
import Button from '../../helix/buttons/Button';
import Submit from '../../helix/buttons/Submit';
import CurrencySelector from './CurrencySelector';

export class BillingInfoForm extends React.Component {
  render() {
    const { t, handleSubmit, history, valid, customerType, country } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="Input-section u-form">
          <h2>{t('common:account.header.billingInfo')}</h2>
          <FormSection name="billingInfo">
            <AddressSection customerType={customerType} country={country} />
            <CurrencySelector
              customerType={customerType}
              country={country}
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
                  onClick={() => this.props.history.push('/user-detail')}
                  disabled={!valid}
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
  valid: PropTypes.bool.isRequired,
  customerType: PropTypes.string,
  country: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => {
  return {
    customerType: formValueSelector('signUp')(state, 'customerInfo.customerType'),
    country: formValueSelector('signUp')(state, 'billingInfo.address.country')
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
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(withTranslation()(BillingInfoForm));

export default withRouter(connect(mapStateToProps, null)(BillingReduxForm));
