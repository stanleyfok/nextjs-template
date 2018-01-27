import React from 'react';
import PropTypes from 'prop-types';

import ConfigProvider from '../components/providers/ConfigProvider';
import withPage from '../components/hoc/withPage';
import withI18N from '../components/hoc/withI18N';
import Layout from '../components/common/Layout';
import Show from '../components/content/Show';

import ApiClient from '../lib/api-client';
import config from '../configs/config';

class ShowPage extends React.Component {
  static async getInitialProps({ query }) {
    const { id } = query;
    const apiClient = new ApiClient(config.api.baseURL);
    const result = await apiClient.getShow(id);

    return { result };
  }

  render() {
    const { result } = this.props;

    return (
      <ConfigProvider config={config}>
        <Layout>
          <Show result={result} />
        </Layout>
      </ConfigProvider>
    );
  }
}

ShowPage.propTypes = {
  result: PropTypes.object,
};

export default withPage(withI18N(ShowPage, ['show']));
