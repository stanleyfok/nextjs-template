import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import Meta from '../components/Meta';
import Error from '../components/Error';
import withLayout from '../components/withLayout';

class MyError extends React.Component {
  static getInitialProps({ res, err }) {
    const { statusCode } = res || err;

    return { statusCode };
  }

  render() {
    const { t, statusCode } = this.props;

    return [
      <Meta
        key="0"
        title={t('error:meta.title')}
        description={t('error:meta.description')}
      />,
      <Error key="1" statusCode={statusCode} />,
    ];
  }
}

MyError.propTypes = {
  t: PropTypes.func,
  statusCode: PropTypes.number,
};

export default withLayout(MyError, Layout, ['error']);
