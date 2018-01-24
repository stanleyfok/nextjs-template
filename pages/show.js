import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import urljoin from 'url-join';

import Layout from '../components/Layout';
import Meta from '../components/Meta';
import Error from '../components/Error';
import withLayout from '../components/withLayout';
import withI18N from '../components/withI18N';

import ApiClient from '../lib/api-client';

class Show extends React.Component {
  static async getInitialProps({ config, query }) {
    const { id } = query;
    const apiClient = new ApiClient(config.api.baseURL);
    const res = await apiClient.getShow(id);

    return Object.assign({}, res, { imagePath: config.paths.images });
  }

  render() {
    const {
      t, data, statusCode, imagePath,
    } = this.props;

    if (statusCode >= 400) {
      return <Error statusCode={statusCode} />;
    }

    const image = data.image
      ? data.image.medium
      : urljoin(imagePath, 'placeholder.png');

    return [
      <Meta
        key="0"
        title={t('show:meta.title', { name: data.name })}
        description={t('show:meta.description')}
      />,
      <div key="1" className="show">
        <h1>{data.name}</h1>
        <div className="row">
          <div className="col-md-3">
            <img className="img-fluid" src={image} />
          </div>
          <div className="col-md-9">
            <div dangerouslySetInnerHTML={{ __html: data.summary }}></div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-12">
            <Link href="/index" as="/">
              <a className="btn btn-primary">Back</a>
            </Link>
          </div>
        </div>
      </div>,
    ];
  }
}

Show.propTypes = {
  t: PropTypes.func,
  data: PropTypes.object,
  statusCode: PropTypes.number,
  imagePath: PropTypes.string,
};

export default withI18N(withLayout(Show, Layout), ['show']);
