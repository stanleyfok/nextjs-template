import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import slug from 'slug';

import withI18N from '../hoc/withI18N';

const Index = ({ t, result }) => (
  <div>
    <div className="index">
      <h1>{t('index:content.header')}</h1>
      <p>{t('index:content.subTitle', { count: result.data.length })}</p>
      <ul>
        {result ?
          result.data.map(item =>
            <li key={item.show.id}>
              <Link prefetch href={`/show?id=${item.show.id}`} as={`/shows/${item.show.id}-${slug(item.show.name)}`}>
                <a>{item.show.name} {item.show.rating.average ? `(${item.show.rating.average})` : ''}</a>
              </Link>
            </li>)
          :
          ''
        }
      </ul>
    </div>
  </div>
);

Index.propTypes = {
  t: PropTypes.func,
  result: PropTypes.object,
};

export default withI18N(Index, ['index', 'error']);
export const undecorated = Index;
