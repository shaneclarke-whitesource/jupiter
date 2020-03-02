import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, Field } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { checkUsername } from '../../actions/checkUsername';
import Input from '../helix/inputTypes/Input';

export class UserName extends React.Component {
  usernameChanged = (e) => {
    e.preventDefault();
    this.props.checkIfExists(e.target.value);
  };

  render() {
    const { t, username, setUsername, exists } = this.props;
    if (!exists || username) { setUsername(username); }
    return (
      <div className="hxCol hxSpan-12 UsernameField">
        <Field
          name="username"
          component={Input}
          onBlur={this.usernameChanged}
          type="text"
          label={t('common:actions.create.username')}
          required
        />
        <div className="error">
          {username && exists && (
            <hx-error>
              <small>{t('validation:username.exists')}</small>
            </hx-error>
          )}
        </div>
      </div>
    );
  }
}

UserName.propTypes = {
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
    username: state.username.username,
    exists: state.username.exists,
    error: state.username.error
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
