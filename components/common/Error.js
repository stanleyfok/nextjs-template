import React from 'react';
import PropTypes from 'prop-types';

import withI18N from '../hoc/withI18N';

const Error = ({ t, statusCode }) => (
  <div className="error">
    <p>
      {statusCode
        ? t('error:content.withStatusCode', { statusCode })
        : t('error:content.withoutStatusCode')
      }
    </p>
  </div>
);

Error.propTypes = {
  t: PropTypes.func,
  statusCode: PropTypes.number,
};

export default withI18N(Error, ['error']);
