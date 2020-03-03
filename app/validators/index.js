import i18n from '../i18n';
import _ from 'lodash';
import validate from 'validate.js';
import { checkUsername } from '../actions/checkUsername';

function translateDefaultValidators(t) {
  validate.validators.presence.message = t('validation:input.required');
}

function i18nT() {
  return i18n.t.bind(i18n);
}

export const validateEmail = (values, { t = i18nT() }) => {
  return validate(values, {
    email: {
      presence: {
        allowEmpty: false
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
        allowEmpty: false
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
        allowEmpty: false
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


export const validatePhoneNumber = (values, { t = i18nT() }) => {
  const errors = validate(values, {
    phoneNumber: {
      presence: true
    }
  }, { fullMessages: false }) || {};
  const phoneNumber = _.get(values, 'phoneNumber');
  if (phoneNumber) {
    if (typeof phoneNumber === 'object') {
      if (_.isEmpty(_.trim(phoneNumber.number))) {
        errors.phoneNumber = [t('validation:input.required')];
      } else if (!phoneNumber.valid) {
        errors.phoneNumber = [t('validation:phone.mustBeAValidNumber')];
      }
    }
  }
  return errors;
};

export const validateAddress = (values, { t = i18nT() }) => {
  translateDefaultValidators(t);
  const address = _.get(values, 'address', {});
  const errors = validate(address, {
    country: {
      presence: {
        allowEmpty: false
      }
    },
    street: {
      presence: {
        allowEmpty: false
      }
    },
    state: {
      presence: {
        allowEmpty: false
      }
    },
    city: {
      presence: {
        allowEmpty: false,
        message: t('validation:input.required')
      }
    },
    zipcode: {
      presence: {
        allowEmpty: false
      },
      length: {
        maximum: 20,
        tooLong: t('validation:input.maxLength', {
          content: undefined,
          characterCount: '%{count}'
        })
      }
    }
  }, { fullMessages: false });
  return errors ? { address: errors } : {};
};

export const validateUser = (values, { t = i18nT() }) => {
  const userInfo = _.get(values, 'userInfo');
  translateDefaultValidators(t);
  const errors = validate(userInfo, {
    firstName: {
      presence: {
        allowEmpty: false
      },
      length: {
        maximum: 100,
        tooLong: t('validation:input.maxLength', {
          content: 'Input',
          characterCount: '%{count}'
        })
      }
    },
    lastName: {
      presence: {
        allowEmpty: false
      },
      length: {
        maximum: 100,
        tooLong: t('validation:input.maxLength', {
          content: 'Input',
          characterCount: '%{count}'
        })
      }
    },
    username: {
      presence: {
        allowEmpty: false
      },
      length: {
        maximum: 15,
        tooLong: t('validation:input.lessOrEqual', {
          content: 'Username',
          characterCount: '%{count}'
        })
      }
    },
    accountName: {
      presence: {
        allowEmpty: false
      },
      length: {
        maximum: 255,
        tooLong: t('validation:input.maxLength', {
          content: 'Account Name',
          characterCount: '%{count}'
        })
      }
    }
  }, { fullMessages: false }) || {};
  return {
    userInfo: {
      ...errors,
      ...validateEmail(userInfo, t),
      ...validatePassword(userInfo, t),
      ...validatePhoneNumber(userInfo, t),
      ...validateAddress(userInfo, t)
    }
  };
};
export const asyncValidate = (values, dispatch, { t = i18nT() }) => {
  return new Promise((resolve, reject) => {
    dispatch(checkUsername(values.userInfo.username))
      .then((response) => {
        if (response.exist) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ userInfo: { username: [t('validation:username.exists')] } });
        } else {
          resolve();
        }
      });
  }, 3000);
};
