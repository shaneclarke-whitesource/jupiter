import React from 'react';
import PropTypes from 'prop-types';
import { CountryDropdown } from 'react-country-region-selector';

class CountrySelect extends React.Component {
  render() {
    const { input, onCountryChange, country, label } = this.props;
    return (
      <div className="InputField">
        <hx-select-control>
          <CountryDropdown
            {...input}
            name={input.name}
            className="form-control"
            value={country}
            id={input.name}
            onChange={(val) => input.onChange(onCountryChange(val))}
          />
          <hx-select />
          <label htmlFor={input.name}>
            <span className="InputField-label">{label}</span>
          </label>
        </hx-select-control>
      </div>
    );
  }
}

CountrySelect.propTypes = {
  country: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onCountryChange: PropTypes.func,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};


export default CountrySelect;
