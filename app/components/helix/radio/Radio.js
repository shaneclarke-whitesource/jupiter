import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field } from 'redux-form';

export const Radio = ({ options, fieldName }) => {
  const radioInput = ({ input }) => (
    _.map(options, (option, index) => {
      return (
        <hx-radio-control key={index}>
          <div className="radio-input">
            <input
              {...input}
              id={option.id}
              type="radio"
              value={option.value}
              checked={option.value === input.value}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        </hx-radio-control>
      );
    }));

  return (
    <div className="radio-options">
      <Field
        component={radioInput}
        name={fieldName}
        options={options}
      />
    </div>
  );
};

Radio.propTypes = {
  fieldName: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.string
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  )
};

export default Radio;
