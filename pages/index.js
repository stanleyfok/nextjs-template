import React from 'react';
import Link from 'next/link';

import Error from './_error';
import Layout from '../components/Layout';
import Meta from '../components/Meta';

import config from '../configs/config';
import ApiClient from '../lib/api-client';

export default class Index extends React.Component {
  static async getInitialProps() {
    const apiClient = new ApiClient(config.api.baseURL);
    const res = await apiClient.getShows('batman');

    return res;
  }

  render() {
    if (this.props.statusCode >= 400) {
      return <Error statusCode={this.props.statusCode} />;
    }

    return [
      <Meta
        key="0"
        title="Batman Shows | Nextjs Template"
        description="A comprehensive Nextjs template"
      />,
      <Layout key="1">
        <div className="index">
          <h1>Batman TV Programs</h1>
          <ul>
            {
              this.props.data.map(item =>
                <li key={item.show.id}>
                  <Link href={`/show?id=${item.show.id}`} as={`/shows/${item.show.id}`}>
                    <a>{item.show.name} {item.show.rating.average ? `(${item.show.rating.average})` : ''}</a>
                  </Link>
                </li>)
            }
          </ul>
        </div>
      </Layout>,
    ];
  }
}
