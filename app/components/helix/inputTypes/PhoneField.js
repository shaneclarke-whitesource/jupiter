import React from 'react';
import PropTypes from 'prop-types';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import _ from 'lodash';

class PhoneField extends React.Component {
  onChange = (...args) => {
    this.props.input.onChange(this.formatValue(...args));
  };

  onBlur = (...args) => this.props.input.onBlur(this.formatValue(...args));

  /** Format large data-set coming from component into a smaller data-set we can send back to redux-form */
  formatValue = (valid, inputValue, countryData, number) => {
    return {
      valid,
      inputValue,
      number: number.replace(/[- .()]?/g, ''),
      countryCode: _.toUpper(_.get(countryData, 'iso2'))
    };
  };

  render() {
    const { name, id, label, meta: { touched, error } } = this.props;
    return (
      <div className="InputField">
        <label htmlFor={name}>
          <span className="InputField-label">{label}</span>
        </label>
        <IntlTelInput
          fieldId={id}
          name={name}
          onPhoneNumberChange={this.onChange}
          onPhoneNumberBlur={this.onBlur}
          containerClassName="intl-tel-input u-input-stretch form-control tel-input"
          inputClassName="hxTextCtrl"
          formatOnInit
          allowDropdown
          utilsScript="libphonenumber.js"
          nationalMode={false}
        />
        {touched && error && (
          <hx-error>
            <small>{error[0] || error}</small>
          </hx-error>
        )}
      </div>
    );
  }
}

PhoneField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ])
  }),
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired
};

export default PhoneField;
