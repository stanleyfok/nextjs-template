import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import urljoin from 'url-join';

import withI18N from '../hoc/withI18N';
import withConfig from '../hoc/withConfig';
import Error from '../common/Error';

const Show = ({ config, result }) => {
  if (result.statusCode >= 400) {
    return <Error statusCode={result.statusCode} />;
  }

  const image = result.data.image
    ? result.data.image.medium
    : urljoin(config.paths.images, 'placeholder.png');

  return (
    <div>
      <div className="show">
        <h1>{result.data.name}</h1>
        <div className="row">
          <div className="col-md-3">
            <img className="img-fluid" src={image} />
          </div>
          <div className="col-md-9">
            <div dangerouslySetInnerHTML={{ __html: result.data.summary }}></div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-12">
            <Link href="/index" as="/">
              <a className="btn btn-primary">Back</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Show.propTypes = {
  config: PropTypes.object,
  result: PropTypes.object,
};

export default withI18N(withConfig(Show), ['show', 'error']);
