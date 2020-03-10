import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ id, content, input, disabled }) => {
  return (
    <hx-checkbox-control>
      <input
        type="checkbox"
        id={id}
        onChange={input.onChange}
        disabled={disabled}
        checked={disabled ? false : input.value}
      />
      <label htmlFor={id} className="disallow-user-select">
        <hx-checkbox />
        {content}
      </label>
    </hx-checkbox-control>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ])
  }),
  disabled: PropTypes.bool
};

export default Checkbox;
