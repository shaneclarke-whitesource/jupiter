import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

class Submit extends React.Component {
  render() {
    return (
      <Button
        {...this.props}
        submit
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
