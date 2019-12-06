import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = ({ children }) => {
  return (
    <hx-radio-set>
      {children}
    </hx-radio-set>
  );
};

RadioGroup.propTypes = {
  children: PropTypes.node
};

export default RadioGroup;
