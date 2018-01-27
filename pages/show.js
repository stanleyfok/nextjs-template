import React from 'react';
import PropTypes from 'prop-types';

import withPage from '../components/hoc/withPage';
import withI18N from '../components/hoc/withI18N';
import Layout from '../components/common/Layout';
import Meta from '../components/common/Meta';
import Error from '../components/common/Error';
import Show from '../components/content/Show';

import ApiClient from '../lib/api-client';

class ShowPage extends React.Component {
  static async getInitialProps({ query, config }) {
    const { id } = query;
    const apiClient = new ApiClient(config.api.baseURL);
    const result = await apiClient.getShow(id);

    return { result };
  }

  render() {
    const { t, result } = this.props;

    return (
      <Layout>
        <Meta
          title={t('show:meta.title', { name: result.data.name })}
          description={t('show:meta.description')}
        />
        {result.statusCode >= 400
          ? <Error statusCode={result.statusCode} />
          : <Show result={result} />
        }
      </Layout>
    );
  }
}

ShowPage.propTypes = {
  result: PropTypes.object,
  t: PropTypes.func,
};

export default withPage(withI18N(ShowPage, ['show']));
export const undecorated = ShowPage;
