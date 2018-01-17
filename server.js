const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const i18nextMiddleware = require('i18next-express-middleware');
const i18nextBackend = require('i18next-node-fs-backend');
const i18n = require('i18next');

const i18nConfig = require('./configs/i18n');
const pkg = require('./package.json');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const versionHash = md5(pkg.version);
const handle = app.getRequestHandler();

const routes = require('./configs/routes');
const localesPath = path.join(__dirname, 'locales');

// load dotenv if file exists
if (fs.existsSync('./.env')) {
  dotenv.config();
}

// init i18next with serverside settings
// using i18next-express-middleware
i18n
  .use(i18nextBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(Object.assign({}, i18nConfig, {
    preload: ['en'], // preload all langages
    ns: ['common', 'index', 'show'], // need to preload all the namespaces
    backend: {
      loadPath: path.join(localesPath, '{{lng}}/{{ns}}.json')
    }
  }), () => {
  app.prepare().then(() => {
    const server = express();

    // enable middleware for i18next
    server.use(i18nextMiddleware.handle(i18n));

    // serve locales for client
    server.use(`/locales/${versionHash}`, express.static(localesPath))

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

    server.listen(port, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  }).catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
});
