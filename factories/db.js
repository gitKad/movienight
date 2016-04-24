var config = require('../config');
var Connection = require('tedious').Connection;

var dbConfig;
switch (process.env.NODE_ENV) {
  case 'test':
    dbConfig = config.test.db;
    break;
  case 'production':
    dbConfig = config.production.db;
    break;
  default:
    dbConfig = config.development.db;
}

var connection = new Connection(dbConfig);
  connection.on('connect', function(err) {
    if(err) throw err;
      console.log("Connected to ", dbConfig);
  });

module.exports = connection;
