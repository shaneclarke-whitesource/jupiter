import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    input,
    label,
    required,
    type,
    meta: { touched, error }
  } = props;
  return (
    <div className="InputField">
      <hx-text-control>
        <input
          {...input}
          className="hxTextCtrl"
          type={type}
          name={input.name}
          required={required}
        />
        <label htmlFor={input.name}>
          <span className="InputField-label hxRequired">{label}</span>
        </label>
      </hx-text-control>
      {touched && error && (
        <hx-error>* {error}</hx-error>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  // onChange: PropTypes.func,
  error: PropTypes.bool,
  type: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.bool
  }),
  input: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
};

Input.defaultProps = {
  required: true
};

export default Input;
