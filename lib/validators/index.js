import _ from 'lodash';
import i18n from '../../app/i18n';

function i18nT() {
  return i18n.t.bind(i18n);
}

export const validatePassword = (values, { t = i18nT() }) => {
  const errors = {};
  if (!_.isEqual(values.password, values.passwordValidation)) {
    errors.password = t('validation:basic.required');
  }
  return errors;
};

export const validateEmail = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};
