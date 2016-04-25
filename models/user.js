var db = require('../factories/db');
var Sequelize = require('sequelize');

var User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'firstName'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'lastName'
  }
},{timestamps: false});

module.exports = User;
