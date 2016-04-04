function makeServer() {

  var express = require('express');
  var morgan = require('morgan');
  var bodyParser = require('body-parser');

  var app = express();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  var router = require('../routes')(app);

  // Error Handling
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
  });

  var server = app.listen(process.env.PORT || 1337);

  return server;
}

module.exports = makeServer;
