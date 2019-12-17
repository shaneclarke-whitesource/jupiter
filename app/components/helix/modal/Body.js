import React from 'react';
import PropTypes from 'prop-types';

const Body = (props) => {
  return (
    <hx-modalbody class="Body">
      {props.children}
    </hx-modalbody>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export default Body;
