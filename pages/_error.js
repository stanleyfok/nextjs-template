import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';

import Layout from '../components/Layout';
import Meta from '../components/Meta';
import withI18N from '../components/withI18N';

class MyError extends Error {
  static getInitialProps({ res, err }) {
    const { statusCode } = res || err;

    return { statusCode };
  }

  render() {
    const { t, statusCode } = this.props;

    return (
      <Layout>
        <Meta
          title={t('error:meta.title')}
          description={t('error:meta.description')}
        />
        <div className="error">
          <p>
            {this.props.statusCode
              ? t('error:content.withStatusCode', { statusCode })
              : t('error:content.withoutStatusCode')
            }
          </p>
        </div>
      </Layout>
    );
  }
}

MyError.propTypes = {
  t: PropTypes.func,
  statusCode: PropTypes.number,
};

export default withI18N(MyError, ['error']);
