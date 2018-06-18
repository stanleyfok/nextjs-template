import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import withPage from "components/hoc/withPage";
import Layout from "components/layout/Layout";
import Meta from "components/layout/Meta";
import Show from "components/main/Show";
import ErrorView from "components/common/ErrorView";

import { showFetchData } from "actions/show";

class ShowPage extends React.Component {
  static async getInitialProps({ query, store }) {
    const { id } = query;

    await store.dispatch(showFetchData(id));

    return {};
  }

  render() {
    const { t, show, error } = this.props;

    if (error) {
      return (
        <Layout>
          <Meta
            title={t("error:meta.title")}
            description={t("error:meta.description")}
          />
          <ErrorView message={error.message} />
        </Layout>
      );
    }

    return (
      <Layout>
        <Meta
          title={t("show:meta.title", { name: show.name || "" })}
          description={t("show:meta.description")}
        />
        <Show show={show} />
      </Layout>
    );
  }
}

ShowPage.propTypes = {
  t: PropTypes.func,
  showFetchData: PropTypes.func,
  show: PropTypes.object,
  error: PropTypes.object
};

const mapStateToProps = state => {
  return {
    show: state.show.show,
    isLoading: state.show.isLoading,
    error: state.show.error
  };
};

const mapDispatchToProps = dispatch => ({
  showFetchData: bindActionCreators(showFetchData, dispatch)
});

export default withPage(ShowPage, {
  i18n: { namespaces: ["show", "error"] },
  redux: {
    mapStateToProps,
    mapDispatchToProps
  }
});
