import React from 'react';
import PropTypes from 'prop-types';
import { change, Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import DropDown from '../helix/inputTypes/Dropdown';
import { connect } from 'react-redux';
import CustomerType from './CustomerType';

export class Product extends React.Component {
  handleChange = (e) => {
    if (e.target.value !== 'aws') {
      this.props.clearRbu();
    }
  };

  render() {
    const { t } = this.props;
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
      <div className="Input-section">
        <h2>{t('common:account.product.header')}</h2>
        <Field
          name="productType"
          component={DropDown}
          options={dropdownData}
          valueField="value"
          textField="label"
          label={t('common:account.actions.product.select')}
          id="product-select-popover"
          onChange={this.handleChange}
          required
        />
        <CustomerType />
      </div>
    );
  }
}

Product.propTypes = {
  t: PropTypes.func.isRequired,
  clearRbu: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearRbu: () => {
      dispatch(change('signUp', 'customerType.isRbu', false));
    }
  };
};

const ProductReduxForm = reduxForm({
  form: 'signUp',
  destroyOnUnmount: false
})(withTranslation()(Product));

export default connect(null, mapDispatchToProps)(ProductReduxForm);
