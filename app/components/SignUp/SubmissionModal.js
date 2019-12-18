import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../helix/Modal';
import Button from '../helix/buttons/Button';
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

  returnModal = () => {
    const { t, hideModal } = this.props;
    const message = this.responseMessage();
    return (
      <Modal isOpen onClose={hideModal}>
        <Modal.Header>
          <h1>{message.header}</h1>
        </Modal.Header>
        <Modal.Body>
          <p>{message.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            classNames="hxPrimary"
            onClick={hideModal}
            label={t('common.status.ok')}
          />
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    const { pending, success, error } = this.props;
    return (
      <div className="submission-modal">
        {!pending && (success || error) ? this.returnModal() : null}
      </div>
    );
  }
}

const selector = formValueSelector('signUp');

const mapStateToProps = (state) => {
  return {
    success: state.signUpResponse.success,
    error: state.signUpResponse.error,
    pending: state.signUpResponse.pending,
    username: selector(state, 'username')
  };
};

SubmissionModal.propTypes = {
  success: PropTypes.bool,
  pending: PropTypes.bool,
  username: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string,
    name: PropTypes.string,
    code: PropTypes.number
  }),
  hideModal: PropTypes.func,
  t: PropTypes.func.isRequired
};


export default connect(mapStateToProps, null)(withTranslation()(SubmissionModal));
