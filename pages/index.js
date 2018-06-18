import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import withPage from 'components/hoc/withPage';
import Layout from 'components/layout/Layout';
import Meta from 'components/layout/Meta';
// import Error from 'components/common/Error';
import Index from 'components/content/Index';

import { showsFetchData } from 'actions/shows';

class IndexPage extends React.Component {
  static async getInitialProps({ store }) {
    await store.dispatch(showsFetchData('batman'));

    return {};
  }

  render() {
    const { t, shows } = this.props;

    return (
      <Layout>
        <Meta title={t('index:meta.title')} description={t('index:meta.description')} />
        <Index shows={shows} />
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  isServer: PropTypes.bool,
  showsFetchData: PropTypes.func,
  shows: PropTypes.array,
  t: PropTypes.func,
};

const mapStateToProps = state => ({
  shows: state.shows,
  showsIsLoading: state.showsIsLoading,
});

const mapDispatchToProps = dispatch => ({
  showsFetchData: bindActionCreators(showsFetchData, dispatch),
});

export default withPage(IndexPage, {
  i18n: { namespaces: ['index'] },
  redux: {
    mapStateToProps,
    mapDispatchToProps,
  },
});

export const undecorated = IndexPage;
