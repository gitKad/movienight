var config = require('../config');
var mongoose   = require('mongoose');

if (mongoose.connection.readyState === 0) {

  var dbConfig;
  switch (process.env.NODE_ENV) {
    case 'test':
      dbConfig = config.db.test;
      break;
    case 'production':
      dbConfig = config.db.production;
      break;
    default:
      dbConfig = config.db.development;
  }

  mongoose.connect(dbConfig, function (err) {
    if (err) {
      throw err;
    }
  });
}

module.exports = mongoose;
