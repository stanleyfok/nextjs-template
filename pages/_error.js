import React from 'react';
import PropTypes from 'prop-types';

import ConfigProvider from '../components/providers/ConfigProvider';
import withI18N from '../components/hoc/withI18N';
import Layout from '../components/common/Layout';
import Error from '../components/common/Error';

import config from '../configs/config';

class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const { statusCode } = res || err;

    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;

    return (
      <ConfigProvider config={config}>
        <Layout>
          <Error statusCode={statusCode} />
        </Layout>
      </ConfigProvider>
    );
  }
}

ErrorPage.propTypes = {
  t: PropTypes.func,
  statusCode: PropTypes.number,
};

export default withI18N(ErrorPage, ['error']);
