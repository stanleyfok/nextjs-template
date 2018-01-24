import React from 'react';
import PropTypes from 'prop-types';

import withI18N from './withI18N';
import config from '../configs/config';

const withLayout = (Child, Layout, namespaces) => {
  class LayoutComponent extends React.Component {
    static async getInitialProps(ctx) {
      const newCtx = Object.assign({}, ctx, { config });
      const childProps = await Child.getInitialProps(newCtx);

      return childProps;
    }

    render() {
      return (
        <Layout config={config}>
          <Child {...this.props} />
        </Layout>
      );
    }
  }

  LayoutComponent.propTypes = {
    config: PropTypes.object,
  };

  return withI18N(LayoutComponent, namespaces);
};

export default withLayout;
