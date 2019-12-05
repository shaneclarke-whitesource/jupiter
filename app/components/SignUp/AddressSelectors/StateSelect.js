import React from 'react';
import PropTypes from 'prop-types';
import { RegionDropdown } from 'react-country-region-selector';

class StateSelect extends React.Component {
  state = {
    region: ''
  };

  selectRegion = (val) => {
    this.setState({ region: val });
  };

  render() {
    const { input, country, label } = this.props;
    return (
      <div className="InputField">
        <hx-select-control>
          <RegionDropdown
            {...input}
            name={input.name}
            country={country}
            value={this.state.region}
            countryValueType="short"
            valueType="short"
            id={input.name}
            onChange={(val) => input.onChange(this.selectRegion(val))}
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

StateSelect.propTypes = {
  label: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};


export default StateSelect;
