import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import withI18N from 'components/hoc/withI18N';

import placeholder from 'assets/images/placeholder.png';

const Show = ({ show }) => {
  const image = show.image ? show.image.medium : placeholder;

  return (
    <div className="show">
      <h1>{show.name}</h1>
      <div className="row">
        <div className="col-md-3">
          <img className="img-fluid" src={image} />
        </div>
        <div className="col-md-9">
          <div dangerouslySetInnerHTML={{ __html: show.summary }} />
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
  );
};

Show.propTypes = {
  config: PropTypes.object,
  show: PropTypes.object,
};

export default withI18N(Show, ['show', 'error']);
export const undecorated = Show;
