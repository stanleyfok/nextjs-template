import React from 'react';
import PropTypes from 'prop-types';

import withPage from 'components/hoc/withPage';
import Layout from 'components/layout/Layout';
import Meta from 'components/layout/Meta';
import Error from 'components/common/Error';

class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const { statusCode } = res || err;

    return { statusCode };
  }

  render() {
    const { t, statusCode } = this.props;

    return (
      <Layout>
        <Meta title={t('index:meta.title')} description={t('index:meta.description')} />
        <Error statusCode={statusCode} />
      </Layout>
    );
  }
}

ErrorPage.propTypes = {
  t: PropTypes.func,
  statusCode: PropTypes.number,
};

export default withPage(ErrorPage, {
  i18n: { namespaces: ['common', 'error'] },
});

export const undecorated = ErrorPage;
