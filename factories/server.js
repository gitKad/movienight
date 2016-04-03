function makeServer() {

  var express = require('express'),
      app = express();

  app.use(require('../controllers/index.js'));

  var server = app.listen(1337, function () {
    var port = server.address().port;
  });

  return server;
}

module.exports = makeServer;
