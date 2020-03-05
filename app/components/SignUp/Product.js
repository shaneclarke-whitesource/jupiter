import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Popover from '../helix/popover/Popover';
import DropDown from '../helix/inputTypes/Dropdown';

export class Product extends React.Component {
  state = {
    isOpen: null,
    product: 'notSelected',
    touched: false,
    error: false
  };

  handleChange = (e) => {
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
        label: t('common:account.product.gcc'),
        value: 'gcc'
      },
      {
        label: t('common:account.product.azureV1'),
        value: 'azureV1'
      },
      {
        label: t('common:account.product.azureV2'),
        value: 'azureV2'
      }
    ];
    return (
      <div className="Input-section">
        <h2>{t('common:account.product.type')}</h2>
        <Popover
          title={t('common:account.product.header')}
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
              onChange={this.handleChange}
            />
          </Popover.Body>
        </Popover>
      </div>
    );
  }
}

Product.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(Product);
