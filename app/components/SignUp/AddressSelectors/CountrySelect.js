import React from 'react';
import PropTypes from 'prop-types';
import { CountryDropdown } from 'react-country-region-selector';

class CountrySelect extends React.Component {
  render() {
    const { input, country, label, onCountryChange } = this.props;
    return (
      <div className="InputField">
        <hx-select-control>
          <CountryDropdown
            {...input}
            name={input.name}
            value={country}
            valueType="short"
            id={input.name}
            onChange={onCountryChange}
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
  country: PropTypes.string,
  label: PropTypes.string.isRequired,
  onCountryChange: PropTypes.func,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

CountrySelect.defaultProps = {
  country: ''
};


export default CountrySelect;
