import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ id, content, input }) => {
  return (
    <hx-checkbox-control>
      <input
        type="checkbox"
        id={id}
        onChange={input.onChange}
      />
      <label htmlFor={id} className="disallow-user-select">
        <hx-checkbox> </hx-checkbox>
        {content}
      </label>
    </hx-checkbox-control>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func
  })
};

export default Checkbox;
