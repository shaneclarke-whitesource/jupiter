import React from 'react';
import PropTypes from 'prop-types';

export class SignUpSection extends React.Component {
  render() {
    return (
      <div className="hx-row">
        <div className="hxCol hxSpan-10 hxOffset-1 hxSpan-10-xs">
          <div className="hxCol hxCol hxSpan-11 hxSpan-11-xs">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

SignUpSection.propTypes = {
  children: PropTypes.node
};

export default SignUpSection;
