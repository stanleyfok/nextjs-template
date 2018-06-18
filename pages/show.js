import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import withPage from 'components/hoc/withPage';
import Layout from 'components/layout/Layout';
import Meta from 'components/layout/Meta';
import Show from 'components/main/Show';

import { showFetchData } from 'actions/show';

class ShowPage extends React.Component {
  static async getInitialProps({ query, store }) {
    const { id } = query;

    await store.dispatch(showFetchData(id));

    return {};
  }

  render() {
    const { t, show } = this.props;

    return (
      <Layout>
        <Meta
          title={t('show:meta.title', { name: show.name || '' })}
          description={t('show:meta.description')}
        />
        <Show show={show} />
      </Layout>
    );
  }
}

ShowPage.propTypes = {
  isServer: PropTypes.bool,
  showFetchData: PropTypes.func,
  showId: PropTypes.string,
  show: PropTypes.object,
  t: PropTypes.func,
};

const mapStateToProps = state => ({
  show: state.show,
  showIsLoading: state.showIsLoading,
});

const mapDispatchToProps = dispatch => ({
  showFetchData: bindActionCreators(showFetchData, dispatch),
});

export default withPage(ShowPage, {
  i18n: { namespaces: ['show'] },
  redux: {
    mapStateToProps,
    mapDispatchToProps,
  },
});

export const undecorated = ShowPage;
