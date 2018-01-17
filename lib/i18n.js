import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import config from '../configs/config';
import i18nConfig from '../configs/i18n';

const options = Object.assign({}, i18nConfig, {
  backend: {
    loadPath: `/locales/${config.versionHash}/{{lng}}/{{ns}}.json`,
  },
});

// for browser use xhr backend to load translations and browser lng detector
if (process.browser) {
  i18n
    .use(XHR)
    // .use(Cache)
    .use(LanguageDetector);
}

// initialize if not already initialized
if (!i18n.isInitialized) i18n.init(options);

// a simple helper to getInitialProps passed on loaded i18n data
i18n.getInitialProps = (req, namespaces) => {
  const { defaultNS } = i18n.options;
  let ns = namespaces;

  if (!ns) ns = defaultNS;
  if (typeof ns === 'string') ns = [ns];

  if (ns.indexOf(defaultNS) < 0) {
    ns.push(defaultNS);
  }

  req.i18n.toJSON = () => null; // do not serialize i18next instance and send to client

  const initialI18nStore = {};
  req.i18n.languages.forEach((l) => {
    initialI18nStore[l] = {};
    ns.forEach((n) => {
      initialI18nStore[l][n] = req.i18n.services.resourceStore.data[l]
        ? req.i18n.services.resourceStore.data[l][n] || {}
        : {};
    });
  });

  return {
    i18n: req.i18n,
    initialI18nStore,
    initialLanguage: req.i18n.language,
  };
};

module.exports = i18n;
