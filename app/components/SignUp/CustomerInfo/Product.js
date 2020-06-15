import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { useTranslation } from 'react-i18next';
import DropDown from '../../helix/inputTypes/Dropdown';
import Tooltip from '../../helix/Tooltip';

export const Product = ({ customerType }) => {
  const { t } = useTranslation();
  const dropdownData = [
    {
      label: t('account:product.type.aws'),
      value: 'aws',
      disabled: false // value is not affected by customerType
    },
    {
      label: t('account:product.type.managed_gcp'),
      value: 'managed_gcp',
      disabled: customerType === 'rbu' || customerType === 'onica'
    },
    {
      label: t('account:product.type.azure'),
      value: 'azure',
      disabled: customerType === 'rbu' || customerType === 'onica'

    },
    {
      label: t('account:product.type.managed_vmc'),
      value: 'managed_vmc',
      disabled: customerType === 'rbu' || customerType === 'onica'
    },
    {
      label: t('account:product.type.rpc_v'),
      value: 'rpc_v',
      disabled: customerType === 'onica'
    }
  ];
  const tooltip = (
    <Tooltip id="product-restriction">{t('account:customer.tips.rbu.productRestriction')}</Tooltip>
  );
  return (
    <Field
      name="productType"
      component={DropDown}
      options={dropdownData}
      defaultValue=""
      label={t('account:product.actions.select')}
      id="product-select-popover"
      disabled={!customerType}
      tooltip={tooltip}
      required
    />
  );
};

Product.propTypes = {
  customerType: PropTypes.string
};

export default Product;
