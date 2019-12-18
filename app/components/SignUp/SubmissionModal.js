import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../helix/Modal';
import { withTranslation } from 'react-i18next';
import { formValueSelector } from 'redux-form';

export class SubmissionModal extends React.Component {
  responseMessage = () => {
    const { success, error: { code, message }, t, username } = this.props;
    const modalContent = {
      header: '',
      message: ''
    };
    if (success) {
      modalContent.header = t('common:create.status.success');
      modalContent.message = t('common:create.status.success.message', { username });
    } else {
      modalContent.header = t('validation:error.header');
      switch (code) {
        case 400:
          if (message === 'Invalid Password') {
            modalContent.message = t('validation:error.create.password');
          } else if (message === 'User name already in use.') {
            modalContent.message = t('validation:error.create.userExists', { username });
          } else {
            modalContent.message = message;
          }
          break;
        case 401:
          modalContent.message = t('validation:error.notAuthorized');
          break;
        case 500:
          modalContent.message = t('validation:error.serverError');
          break;
        default:
          modalContent.message = t('validation:error.create.processing', { errorMsg: message });
      }
    }
    return modalContent;
  };

  onClose = () => {
    this.props.hideModal();
  };

  returnModal = () => {
    const message = this.responseMessage();
    return (
      <Modal isOpen onClose={this.onClose}>
        <Modal.Header>
          <h1>{message.header}</h1>
        </Modal.Header>
        <Modal.Body>
          <p>{message.message}</p>
        </Modal.Body>
      </Modal>
    );
  };

  render() {
    const { openModal, success, error } = this.props;
    return (
      <div className="submission-modal">
        {openModal && (success || error !== {}) ? this.returnModal() : null}
      </div>
    );
  }
}

const selector = formValueSelector('signUp');

const mapStateToProps = (state) => {
  return {
    success: state.signUpResponse.success,
    error: state.signUpResponse.error,
    username: selector(state, 'username')
  };
};

SubmissionModal.propTypes = {
  success: PropTypes.bool,
  openModal: PropTypes.bool,
  username: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string,
    name: PropTypes.string,
    code: PropTypes.number
  }),
  t: PropTypes.func.isRequired,
  hideModal: PropTypes.func
};


export default connect(mapStateToProps, null)(withTranslation()(SubmissionModal));
