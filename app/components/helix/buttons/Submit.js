import React from 'react';
import PropTypes from 'prop-types';

class Submit extends React.Component {
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

Submit.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  classNames: PropTypes.string
};

Submit.defaultProps = {
  disabled: false,
  classNames: 'submit-btn hxPrimary'
};


export default Submit;
