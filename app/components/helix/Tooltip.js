import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = (props) => {
  const { id, type, position, children } = props;
  return (
    <div className="tooltip">
      {' '}
      <hx-icon id={`${id}-tooltip`} type={type} />
      <hx-tooltip for={`${id}-tooltip`} position={position}>
        {children}
      </hx-tooltip>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  position: PropTypes.string,
  type: PropTypes.string
};

Tooltip.defaultProps = {
  position: 'right-middle',
  type: 'help-circle'
};
export default Tooltip;
