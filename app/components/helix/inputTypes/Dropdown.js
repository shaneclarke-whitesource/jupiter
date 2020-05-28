import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Error from '../Error';

const DropDown = (props) => {
  const { t } = useTranslation();
  const options = _.map(props.options, (item, index) => {
    return (
      <option key={index + 1} value={item.value}>
        {item.label}
      </option>
    );
  });

  return (
    <div className="Dropdown">
      <hx-select-control>
        <select
          id={props.id}
          onChange={props.input.onChange}
          value={props.input.value}
          {...props.required ? props.required : null}
        >
          <option value="">
            {t('common:account.product.select')}
          </option>
          {options}
        </select>
        <hx-select />
        <label htmlFor={props.id} className={props.required ? 'hxRequired' : null}>
          {props.label}
        </label>
      </hx-select-control>
      <Error meta={props.meta} />
    </div>
  );
};

DropDown.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.string
  }),
  meta: PropTypes.shape({
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ])
  }),
  required: PropTypes.bool
};

export default DropDown;
