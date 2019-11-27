import React from 'react';
import PropTypes from 'prop-types';

class SubmitButton extends React.Component {
  render() {
    const { label, disabled, classNames, onClick } = this.props;
    return (
      <input
        className={`hxBtn ${classNames}`}
        type="submit"
        value={label}
        disabled={disabled}
        onClick={onClick}
      />
    );
  }
}

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  classNames: PropTypes.string
};

SubmitButton.defaultProps = {
  disabled: false,
  classNames: 'submit-btn hxPrimary'
};


export default SubmitButton;
