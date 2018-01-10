import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import path from 'path';

import Error from './_error';
import Layout from '../components/Layout';
import Meta from '../components/Meta';

import config from '../configs/config';
import ApiClient from '../lib/api-client';

class Show extends React.Component {
  static async getInitialProps({ query }) {
    const { id } = query;
    const apiClient = new ApiClient(config.api.baseURL);
    const res = await apiClient.getShow(id);

    return res;
  }

  render() {
    if (this.props.statusCode >= 400) {
      return <Error statusCode={this.props.statusCode} />;
    }

    const image = this.props.data.image
      ? this.props.data.image.medium
      : path.join(config.paths.images, 'placeholder.png');

    return [
      <Meta
        key="0"
        title={`${this.props.data.name} | Nextjs Template`}
        description="A comprehensive Nextjs template"
      />,
      <Layout key="1">
        <h1>{this.props.data.name}</h1>
        <div className="row">
          <div className="col-md-3">
            <img className="img-fluid" src={image} />
          </div>
          <div className="col-md-9">
            <div dangerouslySetInnerHTML={{ __html: this.props.data.summary }}></div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-12">
            <Link href="/index" as="/">
              <a className="btn btn-primary">Back</a>
            </Link>
          </div>
        </div>
      </Layout>,
    ];
  }
}

Show.propTypes = {
  statusCode: PropTypes.number,
  data: PropTypes.object,
};

export default Show;
