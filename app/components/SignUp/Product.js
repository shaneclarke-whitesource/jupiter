import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { validateProductType } from '../../validators';
import { withRouter } from 'react-router';
import DropDown from '../helix/inputTypes/Dropdown';
import CustomerType from './CustomerType';
import Button from '../helix/buttons/Button';

export class Product extends React.Component {
  handleChange = (e) => {
    if (e.target.value !== 'aws') {
      this.props.clearRbu();
    }
  };

  render() {
    const { t, handleSubmit, valid } = this.props;
    const dropdownData = [
      {
        label: t('common:account.product.aws'),
        value: 'aws'
      },
      {
        label: t('common:account.product.managed_gcp'),
        value: 'managed_gcp'
      },
      {
        label: t('common:account.product.azure'),
        value: 'azure'
      },
      {
        label: t('common:account.product.managed_vmc'),
        value: 'managed_vmc'
      },
      {
        label: t('common:account.product.rpc_v'),
        value: 'rpc_v'
      }
    ];
    return (
      <form onSubmit={handleSubmit}>
        <div className="Input-section u-form">
          <h2>{t('common:account.customer.info')}</h2>
          <Field
            name="productType"
            component={DropDown}
            options={dropdownData}
            defaultValue=""
            valueField="value"
            textField="label"
            label={t('common:account.actions.product.select')}
            id="product-select-popover"
            onChange={this.handleChange}
            required
          />
          <CustomerType />
          <div className="NavButtons">
            <div className="hxRow">
              <div className="hxCol hxSpan-12 align-right">
                <Button
                  classNames="btn-wide hxBtn hxPrimary"
                  label={t('common:actions.basic.next')}
                  disabled={!valid}
                  onClick={() => this.props.history.push('/address')}
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

Product.propTypes = {
  t: PropTypes.func.isRequired,
  clearRbu: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearRbu: () => {
      dispatch(change('signUp', 'customerType.isRbu', false));
    }
  };
};

const validate = (values, props) => {
  return {
    ...validateProductType(values, props)
  };
};

const ProductReduxForm = reduxForm({
  form: 'signUp',
  validate,
  destroyOnUnmount: false,
  touchOnChange: true,
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(withTranslation()(Product));

export default withRouter(connect(null, mapDispatchToProps)(ProductReduxForm));
