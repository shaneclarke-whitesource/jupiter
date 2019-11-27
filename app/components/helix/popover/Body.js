import React from 'react';
import PropTypes from 'prop-types';

const Body = ({ children }) => {
  return (
    <hx-div>
      {children}
    </hx-div>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired
};
export default Body;
