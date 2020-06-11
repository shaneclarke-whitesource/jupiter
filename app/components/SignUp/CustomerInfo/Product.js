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
      label: t('common:account.product.aws'),
      value: 'aws',
      disabled: false // value is not affected by customerType
    },
    {
      label: t('common:account.product.managed_gcp'),
      value: 'managed_gcp',
      disabled: customerType === 'rbu' || customerType === 'onica'
    },
    {
      label: t('common:account.product.azure'),
      value: 'azure',
      disabled: customerType === 'rbu' || customerType === 'onica'

    },
    {
      label: t('common:account.product.managed_vmc'),
      value: 'managed_vmc',
      disabled: customerType === 'rbu' || customerType === 'onica'
    },
    {
      label: t('common:account.product.rpc_v'),
      value: 'rpc_v',
      disabled: customerType === 'rbu' || customerType === 'onica'
    }
  ];
  const tooltip = (
    <Tooltip id="product-restriction">{t('common:account.customer.rbu.productRestriction')}</Tooltip>
  );
  return (
    <Field
      name="productType"
      component={DropDown}
      options={dropdownData}
      defaultValue=""
      label={t('common:account.actions.product.select')}
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
