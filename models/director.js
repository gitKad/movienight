var db = require('../factories/db');
var Sequelize = require('sequelize');

var Director = db.define('director', {
  name: {
    type: Sequelize.STRING,
    field: 'name'
  }
},{timestamps: false});

module.exports = Director;
