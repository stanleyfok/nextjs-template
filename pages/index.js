import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Error from './_error';
import Layout from '../components/Layout';
import Meta from '../components/Meta';

import config from '../configs/config';
import ApiClient from '../lib/api-client';
import withI18N from '../hoc/withI18N';

class Index extends React.Component {
  static async getInitialProps() {
    const apiClient = new ApiClient(config.api.baseURL);
    const res = await apiClient.getShows('batman');

    return res;
  }

  render() {
    const {t, data, statusCode} = this.props;

    if (statusCode >= 400) {
      return <Error statusCode={statusCode} />;
    }

    return (
      <Layout>
        <Meta
          key="0"
          title={t('index:meta.title')}
          description={t('index:meta.description')}
        />
        <div className="index">
          <h1>{t('index:content.header')}</h1>
          <p>{data.length} programs are found.</p>
          <ul>
            {data ?
              data.map(item =>
                <li key={item.show.id}>
                  <Link prefetch href={`/show?id=${item.show.id}`} as={`/shows/${item.show.id}`}>
                    <a>{item.show.name} {item.show.rating.average ? `(${item.show.rating.average})` : ''}</a>
                  </Link>
                </li>)
              :
              ''
            }
          </ul>
        </div>
      </Layout>
    );
  }
}

Index.propTypes = {
  statusCode: PropTypes.number,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default withI18N(Index, ['index', 'common']);
