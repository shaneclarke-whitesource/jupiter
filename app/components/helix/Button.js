import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { label, disabled, classNames, type, onClick } = this.props;
    return (
      <button className={`hxBtn ${classNames}`} type={type} disabled={disabled} onClick={onClick}>
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  classNames: PropTypes.string,
  type: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  classNames: '',
  type: 'button'
};


export default Button;
