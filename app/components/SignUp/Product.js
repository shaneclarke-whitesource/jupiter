import React from 'react';
import PropTypes from 'prop-types';
import { change, Field } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Popover from '../helix/popover/Popover';
import DropDown from '../helix/inputTypes/Dropdown';
import { connect } from 'react-redux';

export class Product extends React.Component {
  state = {
    isOpen: null,
    product: 'notSelected',
    touched: false,
    error: false
  };

  handleChange = (e) => {
    if (e.target.value !== 'aws') {
      this.props.clearRbu();
    }
    this.setState({
      product: e.target.value,
      isOpen: null,
      touched: true,
      error: e.target.value === 'notSelected'
    });
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
        <Popover
          title={t('common:account.product.type')}
          id="product-popover"
          product={t(`common:account.product.${this.state.product}`)}
          isOpen={this.state.isOpen}
          classNames="hxRequired customer-info-header"
          touched={this.state.touched}
          error={this.state.error}
          errMsg={t('validation:input.required')}
        >
          <Popover.Header>{t('common:account.actions.product.choose')}</Popover.Header>
          <Popover.Body>
            <Field
              name="productType"
              component={DropDown}
              options={dropdownData}
              valueField="value"
              textField="label"
              label={t('common:account.actions.product.select')}
              id="product-select-popover"
              // onChange={this.handleChange}
              onBlur={this.handleChange}
              required
            />
          </Popover.Body>
        </Popover>
      </div>
    );
  }
}

Product.propTypes = {
  t: PropTypes.func.isRequired,
  clearRbu: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearRbu: () => {
      dispatch(change('signUp', 'userInfo.customerType.isRbu', false));
    }
  };
};

export default connect(null, mapDispatchToProps)(withTranslation()(Product));
