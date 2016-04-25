var config = require('../config');
var Sequelize = require('sequelize');

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

var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.options);

module.exports = sequelize;
