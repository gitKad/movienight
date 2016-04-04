function makeServer() {

  var express = require('express');
  var morgan = require('morgan');
  var bodyParser = require('body-parser');

  var routes = require('../routes/index');
  // var users = require('../routes/users');

  var app = express();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/api', routes);
  // app.use('/users', users);

  // START THE SERVER
  var server = app.listen(process.env.PORT || 1337);

  return server;
}

module.exports = makeServer;
