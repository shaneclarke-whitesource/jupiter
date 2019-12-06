import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Popover from '../helix/popover/Popover';
import DropDown from '../helix/Dropdown';
import Radio from '../helix/Radio/Radio';
import RadioGroup from '../helix/Radio/RadioGroup';

export class Product extends React.Component {
  state = {
    isOpen: null,
    product: 'none',
    touched: false,
    error: false
  };

  handleChange = (e) => {
    this.setState({
      product: e.target.value,
      isOpen: null,
      touched: true,
      error: e.target.value === 'none'
    });
  };

  ifServiceBlocks = () => {
    const { t } = this.props;
    if (this.state.product === 'serviceBlocks') {
      return (
        <div className="hxOffset-2">
          <RadioGroup>
            <Radio
              fieldName="serviceBlocksType"
              options={[
                {
                  id: 'manage',
                  value: 'manageAndOperate',
                  label: t('common:account.product.purchasingManageAndOperate')
                },
                {
                  id: 'architect',
                  value: 'architectAndDeploy',
                  label: t('common:account.product.purchasingArchitectAndDeploy')
                }
              ]}
            />
          </RadioGroup>
        </div>
      );
    }
  };

  render() {
    const { t } = this.props;
    const dropdownData = [
      {
        label: t('common:account.product.aviator'),
        value: 'aviator'
      },
      {
        label: t('common:account.product.navigator'),
        value: 'navigator'
      },
      {
        label: t('common:account.product.serviceBlocks'),
        value: 'serviceBlocks'
      }
    ];
    return (
      <div className="Input-section">
        <h2>{t('common:account.customer.info')}</h2>
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
              name="product"
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
        {this.ifServiceBlocks()}
      </div>
    );
  }
}

Product.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(Product);
