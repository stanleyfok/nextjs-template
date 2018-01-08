import React from 'react';
import Error from 'next/error';

import Layout from '../components/Layout';
import Meta from '../components/Meta';

export default class MyError extends Error {
  static getInitialProps({ res, err }) {
    const { statusCode } = res || err;

    return { statusCode };
  }

  render() {
    return [
      <Meta
        key="0"
        title="Error"
        description="This is an error page"
      />,
      <Layout key="1">
        <p>
          {this.props.statusCode
            ? `An error ${this.props.statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
      </Layout>,
    ];
  }
}
