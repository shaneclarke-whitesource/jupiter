import React from 'react';
import SignupRoutes from '../router/signup';

export class SignUpSection extends React.Component {
  render() {
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

export default SignUpSection;
