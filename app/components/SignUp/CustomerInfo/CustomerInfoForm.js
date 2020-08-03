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

  handleCleanChannel = (e) => {
    this.props.channelType !== ''
    && e.target.value !== 'managed_vmc'
      ? this.props.clearChannel()
      : null;
  }

  handleChannelUpdate = (e) => {
    this.props.updateChannel(e.target.value);
  };

  render() {
    const { t, handleSubmit, customerType, productType } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="Input-section u-form">
          <h2>{t('account:customer.header.info')}</h2>
          <FormSection name="customerInfo">
            <CustomerType handleChange={this.handleChange} />
            <Product customerType={customerType} clearChannelType={this.handleCleanChannel} />
            {
              productType === 'managed_vmc'
                ? <ChannelType channelType={this.props.channelType} handleChannelUpdate={this.handleChannelUpdate} />
                : null
            }
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
  channelType: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  updateChannel: PropTypes.func.isRequired,
  clearChannel: PropTypes.func.isRequired,
  clearProduct: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => {
  return {
    customerType: formValueSelector('signUp')(state, 'customerInfo.customerType'),
    productType: formValueSelector('signUp')(state, 'customerInfo.productType'),
    channelType: formValueSelector('signUp')(state, 'customerInfo.channelType')
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
    },
    updateChannel: (value) => {
      dispatch(change('signUp', 'customerInfo.channelType', value));
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
