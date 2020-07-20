import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, FormSection, formValueSelector, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import Submit from '../../helix/buttons/Submit';
import { validateCustomerInformation } from '../../../validators';
import CustomerType from './CustomerType';
import ChannelType from './infoselectors/ChannelType';
import Product from './Product';

export class CustomerInfoForm extends React.Component {
  onSubmit = () => {
    this.props.history.push('/billing');
  };

  handleChange = () => {
    this.props.clearProduct();
  }

  handleCleanChannel = () => {
    this.props.clearChannel();
  }

  render() {
    const { t, handleSubmit, customerType, productType } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="Input-section u-form">
          <h2>{t('account:customer.header.info')}</h2>
          <FormSection name="customerInfo">
            <CustomerType handleChange={this.handleChange} />
            <Product customerType={customerType} />
            <ChannelType productType={productType} clearChannelType={this.handleCleanChannel} />
          </FormSection>
          <div className="NavButtons">
            <div className="hxRow">
              <div className="hxCol hxSpan-12 align-right">
                <Submit
                  classNames="btn-wide hxBtn hxPrimary"
                  label={t('common:actions.basic.next')}
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

CustomerInfoForm.propTypes = {
  t: PropTypes.func.isRequired,
  customerType: PropTypes.string,
  productType: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  clearChannel: PropTypes.func.isRequired,
  clearProduct: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => {
  return {
    customerType: formValueSelector('signUp')(state, 'customerInfo.customerType'),
    productType: formValueSelector('signUp')(state, 'customerInfo.productType')

  };
};

const validate = (values, props) => {
  return validateCustomerInformation(values, props);
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearProduct: () => {
      dispatch(change('signUp', 'customerInfo.productType', ''));
    },
    clearChannel: () => {
      dispatch(change('signUp', 'customerInfo.channelType', ''));
    }
  };
};

const CustomerInformationReduxForm = reduxForm({
  form: 'signUp',
  validate,
  touchOnChange: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(withTranslation()(CustomerInfoForm));

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerInformationReduxForm));
