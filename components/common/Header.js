import React from 'react';
import PropTypes from 'prop-types';
import urljoin from 'url-join';
import Link from 'next/link';

import withI18N from '../hoc/withI18N';
import withConfig from '../hoc/withConfig';

const Header = ({ t, config }) => (
  <div className="header">
    <div className="container">
      <Link href="/index" as="/">
        <a><img src={urljoin(config.paths.images, 'favicon.png')} /></a>
      </Link>
      <span>{t('common:header.title')}</span>
    </div>
  </div>
);

Header.propTypes = {
  t: PropTypes.func,
  config: PropTypes.object,
};

export default withI18N(withConfig(Header));
export const undecorated = Header;
