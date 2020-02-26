import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, Field, formValueSelector, getFormMeta } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { checkUsername } from '../../actions/checkUsername';
import Input from '../helix/inputTypes/Input';

class UserName extends React.Component {
  componentDidUpdate(prevProps) {
    const { firstName, lastName } = this.props;
    if (!firstName || !lastName) return;
    if (prevProps.firstName !== firstName || lastName !== prevProps.lastName) {
      this.returnUsername(firstName, lastName);
    }
  }

  returnUsername = (firstName, lastName) => {
    const { checkIfExists } = this.props;
    const concatUsername = firstName && lastName ? (`${firstName}.${lastName}`).toLowerCase() : '';
    if (concatUsername) {
      checkIfExists(concatUsername);
    }
  };

  generateUsername = (username) => {
    const { checkIfExists } = this.props;
    const num = Math.floor(Math.random() * 10000);
    const newUsername = username + num.toString();
    checkIfExists(newUsername);
  };

  usernameChanged = (e) => {
    e.preventDefault();
    this.props.checkIfExists(e.target.value);
  };

  render() {
    const { t, username, setUsername, exists } = this.props;
    if (exists && username) this.generateUsername(username);
    if (!exists) setUsername(username);
    return (
      <div className="hxCol hxSpan-12">
        <Field
          name="username"
          component={Input}
          onBlur={this.usernameChanged}
          type="text"
          label={t('common:actions.create.username')}
          required
        />
      </div>
    );
  }
}

UserName.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  setUsername: PropTypes.func.isRequired,
  checkIfExists: PropTypes.func.isRequired,
  formMeta: PropTypes.shape({
    userInfo: PropTypes.shape({
      firstName: PropTypes.object,
      lastName: PropTypes.object
    })
  }),
  exists: PropTypes.bool,
  username: PropTypes.string,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    firstName: formValueSelector('signUp')(state, 'userInfo.firstName'),
    lastName: formValueSelector('signUp')(state, 'userInfo.lastName'),
    formMeta: getFormMeta('signUp')(state),
    username: state.username.username,
    exists: state.username.exists
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (username) => {
      dispatch(change('signUp', 'userInfo.username', username));
    },
    checkIfExists: (username) => {
      dispatch(checkUsername(username));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserName));
