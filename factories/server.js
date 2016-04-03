function makeServer() {

  var express = require('express'),
      routes = require('../routes/index'),
      // user = require('../routes/user'),
      app = express();

  app.use('/', routes);
  // app.use('/user', user);

  var server = app.listen(1337, function () {
    var port = server.address().port;
  });

  return server;
}

module.exports = makeServer;
