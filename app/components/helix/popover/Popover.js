import React from 'react';
import PropTypes from 'prop-types';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

export class Popover extends React.Component {
  componentDidMount() {
    this.checkOpen();
  }

  checkOpen = () => {
    if (this.hxPopover) {
      if (this.props.isOpen) {
        this.hxPopover.setAttribute('open', true);
      } else {
        this.hxPopover.removeAttribute('open');
      }
    }
  };

  setRef = (element) => { this.hxPopover = element; };

  render() {
    this.checkOpen();
    const { title, id, children, product, classNames, error, touched, errMsg } = this.props;
    return (
      <div className="popover">
        <div className="hxRow">
          <div className="hxCol hxSpan-4 hxOffset-1">
            <span className={`InputField-label ${classNames}`}>{title}:</span>
          </div>
          <div className="hxCol hxSpan-3 product">
            {product}
          </div>
          <div className="hxCol hxSpan-1">
            <hx-disclosure aria-controls={id} class="hxBtn hxPrimary">
              <hx-icon type="pencil" />
            </hx-disclosure>
            <hx-popover
              id={id}
              position="right-middle"
              ref={this.setRef}
            >
              {children}
            </hx-popover>
          </div>
          {touched && error && (
            <div className="hxCol hxSpan-3">
              <hx-error>
                <small>{errMsg}</small>
              </hx-error>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  product: PropTypes.string,
  classNames: PropTypes.string,
  error: PropTypes.bool,
  errMsg: PropTypes.string,
  touched: PropTypes.bool
};


Popover.Header = Header;
Popover.Body = Body;
Popover.Footer = Footer;

export default Popover;
