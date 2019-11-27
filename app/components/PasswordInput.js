import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import Button from './helix/Button';
import Input from './helix/Input';

class PasswordInput extends React.Component {
    state = {
      hidden: true
    };

  showPassword = (e) => {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  };

  renderTooltip() {
    const { input: { name }, t } = this.props;
    return (
      <div className="tooltip">
        <hx-icon id={`${name}-tooltip`} type="help-circle" />
        <hx-tooltip for={`${name}-tooltip`} position="right-middle">
          {t('validation:password.charRestrictions')}
          <br /> <br />
          <Trans
            defaults={t('validation:password.allowedSpecialChars')}
            components={[<code className="help-block"> </code>]}
          />
        </hx-tooltip>
      </div>
    );
  }

  render() {
    const {
      input,
      label,
      required,
      tooltip,
      meta: { touched, error, invalid },
      t
    } = this.props;
    const isInvalid = touched && invalid ? 'hxInvalid' : '';
    return (
      <div className="InputField">
        <hx-text-control class={isInvalid}>
          <input
            {...input}
            className="hxTextCtrl"
            type={this.state.hidden ? 'password' : 'text'}
            name={input.name}
            required={required}
            autoComplete="new-password"
          />
          <label htmlFor={input.name}>
            <span className="InputField-label">{label}</span>
            {' '}
            {tooltip && this.renderTooltip()}
          </label>
          <Button
            classNames="hxSuffix hxSecondary"
            label={this.state.hidden ? t('common:actions.basic.show') : t('common:actions.basic.hide')}
            onClick={this.showPassword}
          />
        </hx-text-control>
        {touched && error && (
          <hx-error>
            <small>{error[0] || error}</small>
          </hx-error>
        )}
      </div>
    );
  }
}

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    invalid: PropTypes.bool
  }),
  tooltip: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string
  }),
  t: PropTypes.func.isRequired
};

Input.defaultProps = {
  required: false
};

export default withTranslation()(PasswordInput);
