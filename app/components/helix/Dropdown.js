import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const DropDown = (props) => {
  const list = () => {
    return _.map(props.data, (item, index) => {
      return (
        <option key={index + 1} value={item.value}>
          {item.label}
        </option>
      );
    });
  };
  return (
    <hx-select-control>
      <select id={props.id} onChange={props.onChange}>
        {list()}
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
  data: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func
};

export default DropDown;
