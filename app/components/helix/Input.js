import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { id, label, required } = this.props;
    return (
      <div className="InputField">
        <hx-text-control>
          <input
            id={id}
            name={id}
            required={required}
            type="text"
          />
          <label htmlFor={id}>
            <span className="InputField-label">{label}</span>
          </label>
        </hx-text-control>
      </div>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool
};

Input.defaultProps = {
  required: true
};

export default Input;
