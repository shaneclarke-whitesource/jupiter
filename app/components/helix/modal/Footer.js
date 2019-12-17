import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  return (
    <hx-modalfoot>
      {props.children}
    </hx-modalfoot>
  );
};

Footer.propTypes = {
  children: PropTypes.node.isRequired
};

export default Footer;
