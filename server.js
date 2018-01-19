const express = require('express');
const next = require('next');
const path = require('path');
const i18nextMiddleware = require('i18next-express-middleware');
const i18nextBackend = require('i18next-node-fs-backend');
const i18n = require('i18next');

const envConfig = require('./env-config');
const routes = require('./configs/routes');
const i18nConfig = require('./configs/i18n');

const dev = envConfig.NODE_ENV === 'dev';
const localesPath = path.join(__dirname, 'assets', 'locales');

const app = next({ dev });
const handle = app.getRequestHandler();

// init i18next with serverside settings
// using i18next-express-middleware
i18n
  .use(i18nextBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(Object.assign({}, i18nConfig, {
    preload: ['en'], // preload all langages
    ns: ['common', 'index', 'show', 'error'], // need to preload all the namespaces
    backend: {
      loadPath: path.join(localesPath, '{{lng}}/{{ns}}.json'),
    },
  }), () => {
    app.prepare().then(() => {
      const server = express();

      // enable middleware for i18next
      server.use(i18nextMiddleware.handle(i18n));

      Object.keys(routes).forEach((key) => {
        const tokens = key.split(' ');
        const method = tokens[0].toLowerCase();
        const pattern = tokens[1];
        const actualPage = routes[key];

        server[method](pattern, (req, res) => {
          app.render(req, res, actualPage, req.params);
        });
      });

      server.get('*', (req, res) => handle(req, res));

      server.listen(envConfig.PORT, (err) => {
        if (err) throw err;

        // eslint-disable-next-line no-console
        console.log(`> Ready on http://localhost:${envConfig.PORT}`);
      });
    }).catch((ex) => {
      // eslint-disable-next-line no-console
      console.error(ex.stack);

      process.exit(1);
    });
  });
