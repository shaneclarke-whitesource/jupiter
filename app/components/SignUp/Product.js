import React from 'react';
import PropTypes from 'prop-types';
import { change, Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { validateProductType } from '../../validators';
import DropDown from '../helix/inputTypes/Dropdown';
import { connect } from 'react-redux';
import CustomerType from './CustomerType';
import Button from '../helix/buttons/Button';
import { Context } from '../../containers/Context';

export class Product extends React.Component {
  handleChange = (e) => {
    if (e.target.value !== 'aws') {
      this.props.clearRbu();
    }
  };

  render() {
    const { t } = this.props;
    const { history } = this.context;
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
        <div className="NavButtons">
          <div className="hxRow">
            <div className="hxCol hxSpan-12 align-right">
              <Button
                classNames="btn-wide"
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

Product.propTypes = {
  t: PropTypes.func.isRequired,
  clearRbu: PropTypes.func.isRequired
};

Product.contextType = Context;
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
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(withTranslation()(Product));

export default connect(null, mapDispatchToProps)(ProductReduxForm);
