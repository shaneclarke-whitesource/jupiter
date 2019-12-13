import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    input,
    label,
    required,
    type,
    tooltip,
    meta: { touched, error },
    children,
    hxClassNames,
    autoComplete
  } = props;
  return (
    <div className="InputField">
      <hx-text-control class={hxClassNames}>
        <input
          {...input}
          className="hxTextCtrl"
          type={type}
          name={input.name}
          required={required}
          autoComplete={autoComplete}
        />
        <label htmlFor={input.name}>
          <span className="InputField-label">{label}</span>
          {tooltip}
        </label>
        {children}
      </hx-text-control>
      {touched && error && (
        <hx-error>
          <small>{error[0] || error}</small>
        </hx-error>
      )}
    </div>
  );
};

Input.propTypes = {
  children: PropTypes.node,
  hxClassNames: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  tooltip: PropTypes.node,
  autoComplete: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    warning: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ])
  }),
  input: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
};

Input.defaultProps = {
  required: false,
  type: 'text',
  autoComplete: 'on',
  hxClassNames: ''
};

export default Input;
