import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Input from '../helix/Input';
import { withTranslation } from 'react-i18next';

export class AddressSection extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="address-section">
        <Field
          name="city"
          type="text"
          label={t('common:user.location.city')}
          component={Input}
          required
        />
        <Field
          name="state"
          type="text"
          label={t('common:user.location.state')}
          component={Input}
          required
        />
        <Field
          name="street"
          type="text"
          label={t('common:user.location.street')}
          component={Input}
          required
        />
        <Field
          name="zipCode"
          type="text"
          label={t('common:user.location.zipCode')}
          component={Input}
          required
        />
        <Field
          name="country"
          type="text"
          label={t('common:user.location.country')}
          component={Input}
          required
        />
      </div>
    );
  }
}

AddressSection.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(AddressSection);
