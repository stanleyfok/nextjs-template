import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import favIcon from 'assets/images/favicon.png';
import withI18N from 'components/hoc/withI18N';

const Header = ({ t }) => (
  <div className="header">
    <div className="container">
      <Link href="/index" as="/">
        <a>
          <img src={favIcon} />
        </a>
      </Link>
      <span>{t('common:header.title')}</span>
    </div>
  </div>
);

Header.propTypes = {
  t: PropTypes.func,
  config: PropTypes.object,
};

export default withI18N(Header);
