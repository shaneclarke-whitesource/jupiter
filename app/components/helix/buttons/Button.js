import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { label, disabled, classNames, onClick, processing, submit, children } = this.props;
    return (
      <button // eslint-disable-line react/button-has-type
        className={`hxBtn ${classNames}`}
        type={submit ? 'submit' : 'button'}
        disabled={disabled}
        onClick={onClick}
      >
        {!processing && (label || children)}
        {processing && <span>{label || children}</span>}
        {processing && <hx-busy />}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  classNames: PropTypes.string,
  processing: PropTypes.bool,
  submit: PropTypes.bool
};

Button.defaultProps = {
  disabled: false,
  classNames: '',
  submit: false
};


export default Button;
