import _ from 'lodash';

export const assertIsArray = (value) => {
  if (!value || !_.isArray(value)) {
    throw new Error(value, 'array');
  }
  return value;
};

export const assertIsObject = (value) => {
  if (!value || !_.isObject(value) || !_.some(value)) {
    throw new Error(value, 'object');
  }
  return value;
};

export const parseState = _.wrap((country, countryCode) => {
  const code = _.get(country, ['code']);
  const name = _.get(country, ['name']);
  const states = _.get(country, ['states', 'state']);
  return {
    countryCode,
    code,
    name,
    states
  };
}, (fn, country, countryCode) => fn(assertIsObject(country), countryCode));

export const parseCountry = _.wrap((country) => {
  const code = _.get(country, ['code']);
  const rawStates = _.get(country, ['states', 'state']);
  const states = rawStates && (assertIsArray(rawStates)).map(
    (s) => parseState(s, code)
  );
  return {
    code: _.get(country, ['code']),
    hasZipCode: !!_.get(country, ['hasZipCode']),
    name: _.get(country, ['name']),
    states
  };
}, (fn, country) => fn(assertIsObject(country)));
