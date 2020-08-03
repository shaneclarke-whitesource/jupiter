import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const ChoiceTile = ({
  disabled,
  id,
  icon,
  invalid,
  handleUpdate,
  size,
  subdued,
  name,
  selectedValue,
  item
}) => {
  return (
    <label htmlFor={id} className="hxChoice hxCol hxSpan-4-xs">
      <input
        disabled={disabled}
        invalid={invalid?.toString()}
        name={name}
        value={item.value}
        onChange={(e) => handleUpdate(e)}
        checked={item.value === selectedValue}
        type="radio"
      />
      <hx-tile class={classNames({ hxSubdued: subdued, [size]: true })}>
        <hx-icon type="checkmark" />
        {icon && (
        <div className="hx-tile-icon">
          <hx-icon type={icon} />
        </div>
        )}
        <header>{item.label}</header>
        <header className="hxSubdued"><small>{item.subheader}</small></header>
        <p>{item.description}</p>
      </hx-tile>
    </label>
  );
};

ChoiceTile.propTypes = {
  size: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  selectedValue: PropTypes.string,
  item: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    subheader: PropTypes.string,
    description: PropTypes.string
  }),
  handleUpdate: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  invalid: PropTypes.bool,
  subdued: PropTypes.bool
};

export default ChoiceTile;
