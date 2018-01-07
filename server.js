const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const routes = require('./configs/routes');

app.prepare().then(() => {
  const server = express();

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

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
})
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
