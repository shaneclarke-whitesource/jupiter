import React from 'react';
import PropTypes from 'prop-types';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

const Popover = ({ title, id, children, role, isOpen }) => {
  return (
    <div className="popover">
      <div className="hxRow">
        <div className="hxCol hxSpan-4">
          <span className="InputField-label role">{title}:</span>
        </div>
        <div className="hxCol hxSpan-4 role">
          {role}
        </div>
        <div className="hxCol hxSpan-4">
          <hx-disclosure aria-controls={id} class="hxBtn hxPrimary">
            <hx-icon type="pencil" />
          </hx-disclosure>
          <hx-popover
            id={id}
            position="right-middle"
            open={isOpen ? true : null}
          >
            {children}
          </hx-popover>
        </div>
      </div>
    </div>
  );
};

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  role: PropTypes.string
};


Popover.Header = Header;
Popover.Body = Body;
Popover.Footer = Footer;

export default Popover;
