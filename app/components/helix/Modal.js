import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Header from './modal/Header';
import Body from './modal/Body';
import Footer from './modal/Footer';

/**
 * Helix Modal
 * @example https://rackerlabs.github.io/helix-ui/components/modals/
 */
class Modal extends Component {
  componentDidMount() {
    if (this.hxModal) {
      this.hxModal.addEventListener('close', this.props.onClose);
      this.hxModal.addEventListener('open', this.props.onOpen);
    }
  }

  componentWillUnmount() {
    if (this.hxModal) {
      this.hxModal.removeEventListener('close', this.props.onClose);
      this.hxModal.removeEventListener('open', this.props.onOpen);
    }
  }

  setRef = (element) => { this.hxModal = element; };

  render() {
    return (
      <hx-modal
        id={this.props.id}
        class={`Modal ${this.props.className} ${this.props.size}`}
        ref={this.setRef}
        open={this.props.isOpen ? true : null}
      >
        {this.props.children}
      </hx-modal>
    );
  }
}

Modal.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  size: PropTypes.string,
  onOpen: PropTypes.func
};

Modal.defaultProps = {
  size: 'medium',
  isOpen: false,
  className: ''
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
