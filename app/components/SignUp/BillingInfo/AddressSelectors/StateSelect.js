import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import DropDown from '../../../helix/inputTypes/Dropdown';
import { withTranslation } from 'react-i18next';

export const StateSelect = ({ setRegion, t, country: { states } }) => {
  const options = states && states.map(({ code, name }) => {
    return (
      <option key={code} value={code}>
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
        id="state-select-dropdown"
        onChange={setRegion}
        disabled={!states || !states.length}
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
