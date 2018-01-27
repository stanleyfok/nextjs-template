import React from 'react';
import PropTypes from 'prop-types';

import withPage from '../components/hoc/withPage';
import withI18N from '../components/hoc/withI18N';
import Layout from '../components/common/Layout';
import Error from '../components/common/Error';

class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const { statusCode } = res || err;

    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;

    return (
      <Layout>
        <Error statusCode={statusCode} />
      </Layout>
    );
  }
}

ErrorPage.propTypes = {
  t: PropTypes.func,
  statusCode: PropTypes.number,
};

export default withPage(withI18N(ErrorPage, ['error']));
