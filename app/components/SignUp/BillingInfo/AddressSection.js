import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';
import Input from '../../helix/inputTypes/Input';
import CountrySelect from './AddressSelectors/CountrySelect';
import StateSelect from './AddressSelectors/StateSelect';

export class AddressSection extends React.Component {
  render() {
    const { t, hasZipcode } = this.props;
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
        <div className="hxRow">
          <div className="hxCol hxSpan-6">
            <CountrySelect />
          </div>
          <div className="hxCol hxSpan-6">
            <StateSelect />
          </div>
        </div>
        <Field
          name="zipcode"
          id="zipcode"
          type="text"
          label={t('account:user.location.zipcode')}
          component={Input}
          required
          disabled={!hasZipcode}
        />
      </FormSection>
    );
  }
}

AddressSection.propTypes = {
  t: PropTypes.func.isRequired,
  hasZipcode: PropTypes.bool
};

export default AddressSection;
