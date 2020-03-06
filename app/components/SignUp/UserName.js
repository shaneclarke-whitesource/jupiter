import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, Field } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { checkUsername } from '../../actions/checkUsername';
import Input from '../helix/inputTypes/Input';
import Tooltip from '../helix/Tooltip';

export class UserName extends React.Component {
  render() {
    const { t, username, setUsername } = this.props;
    setUsername(username);
    const tooltip = (
      <Tooltip id="username-tooltip">{t('common:actions.generate.username')}</Tooltip>
    );
    return (
      <div className="hxCol hxSpan-12 UsernameField">
        <Field
          name="username"
          component={Input}
          tooltip={tooltip}
          type="text"
          label={t('common:actions.create.username')}
          required
        />
      </div>
    );
  }
}

UserName.propTypes = {
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    username: state.username.username
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
