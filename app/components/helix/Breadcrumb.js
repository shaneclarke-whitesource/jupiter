import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ breadcrumb }) => {
  if (breadcrumb.length === 0) return null;

  const crumbs = breadcrumb
    .map((o) => Object.entries(o)[0])
    .map(([title, url], index) => {
      return [
        <Link to={url} key={title} className="BreadCrumb">{title}</Link>,
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
