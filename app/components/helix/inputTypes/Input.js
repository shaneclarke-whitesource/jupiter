import React from 'react';
import PropTypes from 'prop-types';
import Error from '../Error';
const Input = (props) => {
  const {
    input,
    label,
    required,
    type,
    tooltip,
    meta,
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
          required={meta.touched ? required : false}
          autoComplete={autoComplete}
        />
        <label htmlFor={input.name}>
          <span className="InputField-label">{label}</span>
          {tooltip}
        </label>
        {children}
      </hx-text-control>
      <Error meta={meta} />
    </div>
  );
};

Input.propTypes = {
  children: PropTypes.node,
  hxClassNames: PropTypes.string,
  optional: PropTypes.bool,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  tooltip: PropTypes.node,
  autoComplete: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
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
  hxClassNames: '',
  meta: {}
};

export default Input;
