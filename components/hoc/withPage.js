import React from 'react';

import ConfigProvider from '../providers/ConfigProvider';

import config from '../../configs/config';

const withPage = (Child) => {
  class PageComponent extends React.Component {
    static async getInitialProps(ctx) {
      const { req } = ctx;
      const isServer = !!req;

      let childProps = {};

      if (Child.getInitialProps) {
        childProps = await Child.getInitialProps(ctx);
      }

      return {
        ...childProps,
        isServer,
      };
    }

    constructor(props) {
      super(props);

      //to do
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
