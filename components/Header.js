import React from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import Link from 'next/link';

const Header = props => (
  <div className="header">
    <div className="container">
      <Link href="/index" as="/">
        <a><img src={path.join(props.imagePath, 'favicon.png')} /></a>
      </Link>
      <span>Batman TV Programs</span>
    </div>
  </div>
);

Header.propTypes = {
  imagePath: PropTypes.string,
};

export default Header;
