import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const DropDown = (props) => {
  const options = _.map(props.options, (item, index) => {
    return (
      <option key={index + 1} value={item.value}>
        {item.label}
      </option>
    );
  });

  return (
    <hx-select-control>
      <select id={props.id} onChange={props.input.onChange}>
        {options}
      </select>
      <hx-select />
      <label htmlFor={props.id}>
        {props.label}
      </label>
    </hx-select-control>
  );
};

DropDown.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  input: PropTypes.shape({
    onChange: PropTypes.func
  })
};

export default DropDown;