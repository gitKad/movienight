var express = require('express'),
    http = require('http'),
    app = express();

app.use(require('./controllers/index.js'));

var server   = http.createServer(app);
server.listen(1337, function() {

});

module.exports = server
