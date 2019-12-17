import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <hx-modalhead>
      {props.content || props.children}
    </hx-modalhead>
  );
};

Header.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node
};

export default Header;
