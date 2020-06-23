import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RegionDropdown } from 'react-country-region-selector';
import { formValueSelector } from 'redux-form';
import Error from '../../../helix/Error';

export class StateSelect extends React.Component {
  render() {
    const { input, country, label, region, meta } = this.props;
    return (
      <div className="InputField">
        <hx-select-control>
          <RegionDropdown
            {...input}
            name={input.name}
            country={country}
            value={region}
            countryValueType="short"
            id={input.name}
            onChange={this.props.setRegion}
          />
          <hx-select />
          <label htmlFor={input.name}>
            <span className="InputField-label">{label}</span>
          </label>
        </hx-select-control>
        <Error meta={meta} />
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
  region: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    warning: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ])
  })
};

StateSelect.defaultProps = {
  country: '',
  region: '',
  meta: {}
};

const mapStateToProps = (state) => {
  return {
    region: formValueSelector('signUp')(state, 'billingInfo.address.state')
  };
};

export default connect(mapStateToProps, null)(StateSelect);
