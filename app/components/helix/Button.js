import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { label, disabled, classNames, onClick } = this.props;
    return (
      <button className={`hxBtn ${classNames}`} type="button" disabled={disabled} onClick={onClick}>
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  classNames: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  classNames: ''
};


export default Button;
