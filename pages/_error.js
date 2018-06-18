import React from 'react';
import PropTypes from 'prop-types';

import withPage from 'components/hoc/withPage';
import Layout from 'components/layout/Layout';
import Meta from 'components/layout/Meta';
import ErrorView from 'components/common/ErrorView';

class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const { statusCode } = res || err;

    return { statusCode };
  }

  render() {
    const { t, statusCode } = this.props;

    return (
      <Layout>
        <Meta title={t('error:meta.title')} description={t('error:meta.description')} />
        <ErrorView message={t('error:message', { statusCode })} />
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
