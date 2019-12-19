import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ meta: { touched, error } }) => {
  return (
    <div className="error">
      {touched && error && (
        <hx-error>
          <small>{error[0] || error}</small>
        </hx-error>
      )}
    </div>
  );
};

Error.propTypes = {
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    warning: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ])
  })
};

Error.defaultProps = {
  meta: {}
};

export default Error;
