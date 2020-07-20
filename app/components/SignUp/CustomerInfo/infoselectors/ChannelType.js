import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { useTranslation } from 'react-i18next';
import DropDown from '../../../helix/inputTypes/Dropdown';
import Tooltip from '../../../helix/Tooltip';

export const ChannelType = ({ clearChannelType, productType }) => {
  const { t } = useTranslation();
  const prevProdType = React.useRef();
  const channelTypes = [
    {
      label: t('account:channel.type.insight'),
      value: 'Insight'
    },
    {
      label: t('account:customer.type.carahsoft'),
      value: 'Carahsoft'
    },
    {
      label: t('account:customer.type.aws'),
      value: 'AWS'
    }
  ];

  useEffect(() => {
    if (prevProdType.current === 'managed_vmc'
    && productType !== 'managed_vmc') {
      clearChannelType();
    }
    prevProdType.current = productType;
  }, [productType]);

  const tooltip = (
    <Tooltip id="channel-restriction">{t('account:customer.tips.vmc.channelRestriction')}</Tooltip>
  );
  return (
    <div className="channelType-section">
      <Field
        name="channelType"
        component={DropDown}
        options={channelTypes}
        valueField="value"
        textField="label"
        label={t('account:customer.channel.select')}
        disabled={productType !== 'managed_vmc'}
        id="channel-select-popover"
        tooltip={tooltip}
        required
      />
    </div>
  );
};

ChannelType.propTypes = {
  clearChannelType: PropTypes.func,
  productType: PropTypes.string
};

export default ChannelType;
