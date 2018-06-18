import React from 'react';
import PropTypes from 'prop-types';

import withI18N from 'components/hoc/withI18N';

const Footer = ({ t }) => (
  <div className="footer">
    <div className="container">{t('common:footer.text')}</div>
  </div>
);

Footer.propTypes = {
  t: PropTypes.func,
};

export default withI18N(Footer);
export const undecorated = Footer;
