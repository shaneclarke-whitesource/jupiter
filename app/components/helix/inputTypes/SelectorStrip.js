import React from 'react';
import _map from 'lodash/map';
import PropTypes from 'prop-types';

const SelectorStrip = ({ options, selectorName, label, required, input }) => {
  const selections = _map(options, (item, index) => {
    return (
      <label htmlFor={item.value} key={index}>
        <input
          {...input}
          id={item.value}
          type="radio"
          value={item.value}
          name={selectorName}
          disabled={item.disabled}
          checked={item.value === input.value}
        />
        <span>{item.label}</span>
      </label>
    );
  });

  return (
    <div className="hxRow">
      <div className={`hxCol hxSpan-4${required ? ' hxRequired' : null}`}>
        {label || ''}
      </div>
      <div className="hxCol hxSpan-8">
        <div className="hxSelector hxRadio">
          {selections}
        </div>
      </div>
    </div>
  );
};

SelectorStrip.propTypes = {
  selectorName: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      disabled: PropTypes.bool
    })
  ).isRequired,
  input: PropTypes.shape({
    value: PropTypes.string
  })
};

export default SelectorStrip;
