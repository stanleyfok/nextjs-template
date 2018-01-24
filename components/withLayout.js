import React from 'react';
import PropTypes from 'prop-types';

import config from '../configs/config';

const withLayout = (Child, Layout) => {
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

  return LayoutComponent;
};

export default withLayout;
