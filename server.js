const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const routes = require('./configs/routes');

// load dotenv if file exists
if (fs.existsSync('./.env')) {
  dotenv.config();
}

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

  server.listen(port, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
