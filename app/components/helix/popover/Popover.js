import React from 'react';
import PropTypes from 'prop-types';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

export class Popover extends React.Component {
  render() {
    const { title, id, btnLabel, children, isOpen, role } = this.props;
    return (
      <div className="popover">
        <div className="hxRow">
          <div className="hxCol hxSpan-4">
            <span className="InputField-label">{title}</span>
          </div>
          <div className="hxCol hxSpan-4">
            {role}
          </div>
          <div className="hxCol hxSpan-4">
            <hx-disclosure aria-controls={id} class="hxBtn hxPrimary">
              {btnLabel}
            </hx-disclosure>
            <hx-popover
              id={id}
              open={isOpen ? true : null}
              position="right-middle"
            >
              {children}
            </hx-popover>
          </div>
        </div>
      </div>
    );
  }
}

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  btnLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  role: PropTypes.string
};


Popover.Header = Header;
Popover.Body = Body;
Popover.Footer = Footer;

export default Popover;
