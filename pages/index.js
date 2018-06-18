import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import withPage from 'components/hoc/withPage';
import Layout from 'components/layout/Layout';
import Meta from 'components/layout/Meta';
import Index from 'components/common/Index';
import ErrorView from 'components/common/ErrorView';

import { showsFetchData } from 'actions/shows';

class IndexPage extends React.Component {
  static async getInitialProps({ store }) {
    await store.dispatch(showsFetchData('batman'));

    return {};
  }

  render() {
    const { t, shows, error } = this.props;

    if (error) {
      return (
        <Layout>
          <Meta title={t('error:meta.title')} description={t('error:meta.description')} />
          <ErrorView message={error.message} />
        </Layout>
      );
    }

    return (
      <Layout>
        <Meta title={t('index:meta.title')} description={t('index:meta.description')} />
        <Index shows={shows} />
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  t: PropTypes.func,
  showsFetchData: PropTypes.func,
  shows: PropTypes.array,
  error: PropTypes.object,
};

const mapStateToProps = state => ({
  shows: state.shows.shows,
  isLoading: state.shows.isLoading,
  error: state.shows.error,
});

const mapDispatchToProps = dispatch => ({
  showsFetchData: bindActionCreators(showsFetchData, dispatch),
});

export default withPage(IndexPage, {
  i18n: { namespaces: ['index', 'error'] },
  redux: {
    mapStateToProps,
    mapDispatchToProps,
  },
});
