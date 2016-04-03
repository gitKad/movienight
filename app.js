function makeServer() {

  var express = require('express'),
      app = express();

  app.get('/', function (req, res) {
    res.json({'version' : '0.0.1'}).status(200);
  });

  // app.use(require('./controllers/index.js'));

  var server = app.listen(1337, function () {
    var port = server.address().port;
    console.log('App listening on %s',port);
  });

  return server;
}

module.exports = makeServer;
