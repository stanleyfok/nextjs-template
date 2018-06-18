import React from 'react';
import PropTypes from 'prop-types';

import withI18N from 'components/hoc/withI18N';

const ErrorView = ({ t, statusCode }) => (
  <div className="error">
    <p>
      {statusCode
        ? t('error:content.withStatusCode', { statusCode })
        : t('error:content.withoutStatusCode')}
    </p>
  </div>
);

ErrorView.propTypes = {
  t: PropTypes.func,
  statusCode: PropTypes.number,
};

export default withI18N(ErrorView, ['error']);
