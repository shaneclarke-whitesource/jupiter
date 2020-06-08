import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, FormSection, formValueSelector, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import Button from '../../helix/buttons/Button';
import { validateCustomerInformation } from '../../../validators';
import CustomerType from './CustomerType';
import Product from './Product';
import { ADDRESS_FIELDS } from '../../../actions/constants/address';

export class CustomerInformation extends React.Component {
  handleChange = (e) => {
    if (e.target.value === 'rbu') {
      this.populateAddressFields();
      this.props.clearProduct();
    } else {
      this.clearAddressFields();
    }
  };

  populateAddressFields = () => {
    Object.entries(ADDRESS_FIELDS).forEach((entry) => {
      this.props.setAddress(...entry);
    });
  };

  clearAddressFields = () => {
    Object.keys(ADDRESS_FIELDS).forEach((field) => {
      this.props.setAddress(field, '');
    });
  };

  render() {
    const { t, handleSubmit, valid, customerType } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="Input-section u-form">
          <h2>{t('common:account.customer.info')}</h2>
          <FormSection name="customerInfo">
            <CustomerType handleChange={this.handleChange} />
            <Product customerType={customerType} />
          </FormSection>
          <div className="NavButtons">
            <div className="hxRow">
              <div className="hxCol hxSpan-12 align-right">
                <Button
                  classNames="btn-wide hxBtn hxPrimary"
                  label={t('common:actions.basic.next')}
                  disabled={!valid}
                  onClick={() => this.props.history.push('/billing')}
                  submit
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

CustomerInformation.propTypes = {
  t: PropTypes.func.isRequired,
  clearProduct: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  customerType: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearProduct: () => {
      dispatch(change('signUp', 'customerInfo.productType', ''));
    },
    setAddress: (field, value) => {
      dispatch(change('signUp', `billingInfo.address.${field}`, value));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    customerType: formValueSelector('signUp')(state, 'customerInfo.customerType')
  };
};

const validate = (values, props) => {
  return {
    ...validateCustomerInformation(values, props)
  };
};

const CustomerInformationReduxForm = reduxForm({
  form: 'signUp',
  validate,
  destroyOnUnmount: false,
  touchOnChange: true,
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(withTranslation()(CustomerInformation));

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerInformationReduxForm));
