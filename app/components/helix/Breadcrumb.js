import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Breadcrumb = ({ breadcrumb }) => {
  if (breadcrumb.length === 0) return null;
  const crumbs = breadcrumb
    .map((o) => Object.entries(o)[0])
    .map(([title, url], index) => {
      return [
        <NavLink exact to={url} key={title} className="crumb" activeClassName="u-active">{title}</NavLink>,
        index < (breadcrumb.length - 1) && <hx-icon key={`${title}-icon`} class="delimiter" type="angle-right" />
      ];
    });

  return (
    <nav className="hxBreadcrumb">
      {crumbs}
    </nav>
  );
};

Breadcrumb.propTypes = {
  breadcrumb: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string
  }))
};

Breadcrumb.defaultProps = {
  breadcrumb: []
};

export default Breadcrumb;
