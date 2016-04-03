function makeServer() {

  var express = require('express'),
      routes = require('../routes/index'),
      users = require('../routes/users'),
      app = express();

  app.use('/', routes);
  app.use('/users', users);

  var server = app.listen(1337, function () {
    var port = server.address().port;
  });

  return server;
}

module.exports = makeServer;
