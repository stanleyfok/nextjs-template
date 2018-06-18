import React from 'react';
import withRedux from 'next-redux-wrapper';
import config from 'configs/config';

import configureStore from '../../redux/store/configureStore';

import withI18N from './withI18N';

const defaultOptions = {
  i18n: {},
  redux: {},
};

const withPage = (Child, options) => {
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
      return <Child {...this.props} />;
    }
  }

  const newOptions = Object.assign({}, defaultOptions, options);

  if (!newOptions.redux.createStore) {
    newOptions.redux.createStore = configureStore;
  }

  return withRedux(newOptions.redux)(withI18N(PageComponent, newOptions.i18n.namespaces));
};

export default withPage;
