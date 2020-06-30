import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { withTranslation } from 'react-i18next';
import DropDown from '../../../helix/inputTypes/Dropdown';

export const StateSelect = ({ setRegion, t, country: { states } }) => {
  const options = states && states.map(({ code, name }) => {
    return (
      <option key={code} value={name}>
        {name}
      </option>
    );
  });
  return (
    <div className="InputField">
      <Field
        name="state"
        component={DropDown}
        label={t('account:user.location.state')}
        valueField="value"
        id="state-select-dropdown"
        onChange={setRegion}
        disabled={!states || (states && !states.length)}
      >
        {options}
      </Field>
    </div>
  );
};

StateSelect.propTypes = {
  country: PropTypes.object,
  setRegion: PropTypes.func,
  t: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    country: state.country.details
  };
};

export default connect(mapStateToProps)(withTranslation()(StateSelect));
