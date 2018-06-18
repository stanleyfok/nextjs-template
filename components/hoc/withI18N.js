import React from 'react';
import { translate } from 'react-i18next';

import i18nHelper from 'lib/i18nHelper';
import config from 'configs/config';
import i18nConfig from 'configs/i18n';

const withI18N = (Child, namespaces = null) => {
  const i18n = i18nHelper(config.paths.locales, i18nConfig);

  class I18NComponent extends React.Component {
    static async getInitialProps(ctx) {
      let childProps = {};

      if (Child.getInitialProps) {
        childProps = await Child.getInitialProps(ctx);
      }

      const i18nProps = i18n.getInitialProps(ctx, namespaces);

      return { ...childProps, ...i18nProps };
    }

    render() {
      return <Child {...this.props} />;
    }
  }

  return translate(namespaces, { i18n, wait: process.browser })(I18NComponent);
};

export default withI18N;
