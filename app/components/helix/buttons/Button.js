import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { label, disabled, classNames, onClick, children } = this.props;
    return (
      <button className={`hxBtn ${classNames}`} type="button" disabled={disabled} onClick={onClick}>
        {label || children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
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
