import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RegionDropdown } from 'react-country-region-selector';
import { change, formValueSelector } from 'redux-form';

export class StateSelect extends React.Component {
  render() {
    const { input, country, label, region } = this.props;
    return (
      <div className="InputField">
        <hx-select-control>
          <RegionDropdown
            {...input}
            name={input.name}
            country={country}
            value={region}
            countryValueType="short"
            valueType="short"
            id={input.name}
            onChange={this.props.setRegion}
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
  country: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  setRegion: PropTypes.func,
  region: PropTypes.string
};

StateSelect.defaultProps = {
  country: '',
  region: ''
};

const mapStateToProps = (state) => {
  return {
    region: formValueSelector('signUp')(state, 'address.state')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRegion: (region) => {
      dispatch(change('signUp', 'address.state', region));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StateSelect);
