const express = require('express');
const next = require('next');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const i18nextMiddleware = require('i18next-express-middleware');
const i18nextBackend = require('i18next-node-fs-backend');
const i18n = require('i18next');

const envConfig = require('./env.config');
const routes = require('./configs/routes');
const i18nConfig = require('./configs/i18n');

const dev = envConfig.NODE_ENV === 'dev';
const localesPath = path.join(__dirname, 'assets', 'locales');

const app = next({ dev });
// const handle = app.getRequestHandler();
const handler = routes.getRequestHandler(app);

// init i18next with serverside settings
// using i18next-express-middleware
i18n
  .use(i18nextBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    Object.assign({}, i18nConfig, {
      preload: ['en'], // preload all langages
      ns: fs.readdirSync(path.join(localesPath, 'en')).map(file => path.parse(file).name),
      backend: {
        loadPath: path.join(localesPath, '{{lng}}/{{ns}}.json'),
      },
    }),
    () => {
      app
        .prepare()
        .then(() => {
          const server = express();

          // enable middleware for i18next
          server
            .use(i18nextMiddleware.handle(i18n))
            .use(compression())
            .use(handler);

          // health check, optional, depending on your monitoring setup
          server.get('/health', (req, res) => res.send('ok'));

          server.listen(envConfig.PORT, (err) => {
            if (err) throw err;

            // eslint-disable-next-line no-console
            console.log(`> Ready on http://localhost:${envConfig.PORT}`);
          });
        })
        .catch((ex) => {
          // eslint-disable-next-line no-console
          console.error(ex.stack);

          process.exit(1);
        });
    },
  );
