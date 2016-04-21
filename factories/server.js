function makeServer() {
  var express = require('express');
  var bodyParser = require('body-parser');
  var app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  var router = require('../routes')(app);

  // Error Handling
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
  });

  var port = process.env.PORT || 1337;
  var server = app.listen(port,function() {
    // console.log('Express server in %s mode is listening on port %d', process.env.NODE_ENV,port);
  });
  return server;
}

module.exports = makeServer;
