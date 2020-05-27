import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import SignupRoutes from '../router/signup';

export class SignUpSection extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="hx-row">
        <div className="hxCol hxSpan-10 hxOffset-1 hxSpan-10-xs">
          <div className="hxCol hxCol hxSpan-11 hxSpan-11-xs">
            <SignupRoutes />
          </div>
        </div>
      </div>
    );
  }
}

SignUpSection.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(SignUpSection);
