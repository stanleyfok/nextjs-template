import React from 'react';
import PropTypes from 'prop-types';

import withPage from '../components/hoc/withPage';
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
      <Layout>
        <Index result={result} />
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  result: PropTypes.object,
};

export default withPage(withI18N(IndexPage, ['index']));
