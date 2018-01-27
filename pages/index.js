import React from 'react';
import PropTypes from 'prop-types';

import ConfigProvider from '../components/providers/ConfigProvider';
import withI18N from '../components/hoc/withI18N';
import Layout from '../components/common/Layout';
import Index from '../components/content/Index';

import ApiClient from '../lib/api-client';
import config from '../configs/config';

class IndexPage extends React.Component {
  static async getInitialProps() {
    const apiClient = new ApiClient(config.api.baseURL);
    const result = await apiClient.getShows('batman');

    return { result };
  }

  render() {
    const { result } = this.props;

    return (
      <ConfigProvider config={config}>
        <Layout>
          <Index result={result} />
        </Layout>
      </ConfigProvider>
    );
  }
}

IndexPage.propTypes = {
  result: PropTypes.object,
};

export default withI18N(IndexPage, ['index']);
