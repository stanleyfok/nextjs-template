import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'configs/routes';

import withI18N from 'components/hoc/withI18N';

const Index = ({ t, shows }) => (
  <div className="index">
    <h1>{t('index:content.header')}</h1>
    <p>{t('index:content.subTitle', { count: shows.length })}</p>
    <ul>
      {shows.map(show => (
        <li key={show.show.id}>
          <Link route="show" params={{ id: show.show.id }}>
            <a>
              {show.show.name} {show.show.rating.average ? `(${show.show.rating.average})` : ''}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

Index.propTypes = {
  t: PropTypes.func,
  shows: PropTypes.array,
};

export default withI18N(Index, ['index', 'error']);
