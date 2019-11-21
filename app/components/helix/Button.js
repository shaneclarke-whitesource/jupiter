import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { label, disabled, classNames } = this.props;
    return (
      <button className={`hxBtn ${classNames}`} disabled={disabled}>
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  classNames: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  classNames: ''
};


export default Button;
