import React from 'react'
import { translate } from 'react-i18next';

import i18n from '../lib/i18n';

const withI18N = (Child, namespaceArg = null) => {
  class I18NComponent extends React.Component {
    static async getInitialProps (ctx) {
      const childProps = await Child.getInitialProps(ctx);
      const i18nProps = (ctx.req && !process.browser) ? i18n.getInitialProps(ctx.req, namespaceArg) : {};

      return Object.assign({}, childProps, i18nProps);
    }

    render () {
      return  <Child {...this.props} />
    }
  }

  return translate(namespaceArg, { i18n, wait: process.browser })(I18NComponent);
}

export default withI18N;
