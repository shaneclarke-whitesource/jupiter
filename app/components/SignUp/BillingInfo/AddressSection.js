import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Input from '../../helix/inputTypes/Input';
import CountrySelect from './AddressSelectors/CountrySelect';
import StateSelect from './AddressSelectors/StateSelect';

export class AddressSection extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <FormSection name="address">
        <Field
          name="street"
          type="text"
          label={t('account:user.location.street')}
          component={Input}
          required
        />
        <Field
          name="city"
          type="text"
          label={t('account:user.location.city')}
          component={Input}
          required
        />
        <Field
          name="zipcode"
          type="text"
          label={t('account:user.location.zipcode')}
          component={Input}
          required
        />
        <div className="hxRow">
          <div className="hxCol hxSpan-6">
            <CountrySelect />
          </div>
          <div className="hxCol hxSpan-6">
            <StateSelect />
          </div>
        </div>
      </FormSection>
    );
  }
}

AddressSection.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(AddressSection);
