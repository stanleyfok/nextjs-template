import React from 'react';

import ConfigProvider from '../providers/ConfigProvider';
import config from '../../configs/config';

const withPage = (Child) => {
  class PageComponent extends React.Component {
    static async getInitialProps(ctx) {
      const newCtx = { ...ctx, config };
      const { req } = newCtx;
      const isServer = !!req;

      let childProps = {};

      if (Child.getInitialProps) {
        childProps = await Child.getInitialProps(newCtx);
      }

      return {
        ...childProps,
        isServer,
      };
    }

    render() {
      return (
        <div>
          <ConfigProvider config={config}>
            <Child {...this.props} />
          </ConfigProvider>
        </div>
      );
    }
  }

  return PageComponent;
};

export default withPage;
