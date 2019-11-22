import i18n from '../i18n';
import validate from 'validate.js';

function translateDefaultValidators(t) {
  validate.validators.presence.message = t('validation:input.required');
}

function i18nT() {
  return i18n.t.bind(i18n);
}

export const validateUser = (values, { t = i18nT() }) => {
  translateDefaultValidators(t);
  return validate(values, {
    firstName: {
      presence: {
        allowEmpty: false
      },
      length: {
        maximum: 32,
        tooLong: t('validation:input.maxLength', {
          content: 'Input',
          characterCount: '%{count}'
        })
      }
    },
    lastName: {
      presence: {
        allowEmpty: false,
        message: t('validation:input.required')
      },
      length: {
        maximum: 32,
        tooLong: t('validation:input.maxLength', {
          content: 'Input',
          characterCount: '%{count}'
        })
      }
    },
    username: {
      presence: {
        allowEmpty: false,
        message: t('validation:input.required')
      },
      length: {
        maximum: 10,
        tooLong: t('validation:input.maxLength', {
          content: 'Username',
          characterCount: '%{count}'
        })
      }
    }
  }, { fullMessages: false }) || {};
};

export const validateEmail = (values, { t = i18nT() }) => {
  return validate(values, {
    email: {
      presence: {
        allowEmpty: false,
        message: t('validation:input.required')
      },
      email: {
        message: t('validation:email.invalidFormat')
      },
      length: {
        maximum: 255,
        tooLong: t('validation:input.maxLength', {
          content: 'Email',
          characterCount: '%{count}'
        })
      }
    }
  }, { fullMessages: false }) || {};
};

validate.validators.regex = (value, options, key, attributes) => {
  const regExp = new RegExp(options.pattern);

  if (!regExp.test(value)) {
    return options.message;
  }
};

export const validatePassword = (values, { t = i18nT() }) => {
  return validate(values, {
    password: {
      presence: {
        allowEmpty: false,
        message: t('validation:input.required')
      },
      length: {
        minimum: 8,
        tooShort: t('validation:input.minLength', {
          content: 'Password',
          characterCount: '%{count}'
        })
      },
      regex: {
        pattern: '^((?=.*[0-9])(?=.*[A-Za-z])(?=.*[@$!%*#?&]))',
        message: t('validation:password.charRestrictions')
      }
    },
    passwordValidate: {
      presence: {
        allowEmpty: false,
        message: t('validation:input.required')
      },
      equality: {
        attribute: 'password',
        message: t('validation:password.mustMatch'),
        comparator: (v1, v2) => {
          return v1 === v2;
        }
      }
    }
  }, { fullMessages: false }) || {};
};
