import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import Button from '../buttons/Button';
import Input from './Input';
import Tooltip from '../Tooltip';

class PasswordInput extends React.Component {
  state = {
    hidden: true
  };

  showPassword = (e) => {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  };

  render() {
    const {
      input,
      label,
      meta,
      tooltip,
      required,
      t
    } = this.props;
    const passwordTooltip = (
      <Tooltip id={input.name}>
        {t('validation:password.charRestrictions')}
        <br /> <br />
        <Trans
          defaults={t('validation:password.allowedSpecialChars')}
          components={[<code className="help-block"> </code>]}
        />
      </Tooltip>
    );
    const isInvalid = meta.touched && meta.invalid ? 'hxInvalid' : '';
    return (
      <Input
        input={input}
        meta={meta}
        label={label}
        type={this.state.hidden ? 'password' : 'text'}
        autoComplete="new-password"
        hxClassNames={isInvalid}
        tooltip={tooltip ? passwordTooltip : null}
        required={meta.touched ? required : false}
      >
        <Button
          classNames="hxSuffix hxSecondary"
          label={this.state.hidden ? t('common:actions.basic.show') : t('common:actions.basic.hide')}
          onClick={this.showPassword}
        />
      </Input>
    );
  }
}

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  tooltip: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    invalid: PropTypes.bool
  }),
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string
  }),
  t: PropTypes.func.isRequired,
  required: PropTypes.bool
};

Input.defaultProps = {
  required: false,
  meta: {}
};

export default withTranslation()(PasswordInput);
