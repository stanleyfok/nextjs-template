const routes = require('next-routes')();

routes.add('index', '/', 'index').add('show', '/shows/:id', 'show');

module.exports = routes;
