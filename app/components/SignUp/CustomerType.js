import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Checkbox from '../helix/Checkbox';

class CustomerType extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="customer-type-section hxOffset-1 hxCenter">
        <div className="hxRow">
          <div className="hxCol hxSpan-3">
            <span className="InputField-label customer-info-header hxRequired">
              {t('common:account.customer.type')}
            </span>
          </div>
          <div className="hxCol hxSpan-6">
            <Field
              name="customerType"
              content={t('common:account.customer.isRbu')}
              textField="label"
              id="customer-type"
              component={Checkbox}
            />
          </div>
        </div>
      </div>
    );
  }
}

CustomerType.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(CustomerType);
