var Sequelize = require("sequelize");
var sequelize = require('../factories/db');
var db        = {};

// import models
db['Actor'] = sequelize.import('./actor');
db['Movie'] = sequelize.import('./movie');
db['Director'] = sequelize.import('./director');
db['MovieDirectors'] = sequelize.import('./moviedirectors');

// describe relationships
(function(m) {

  m.Movie.belongsToMany(m.Director, {through: m.MovieDirectors});
  m.Director.belongsToMany(m.Movie, {through: m.MovieDirectors});
}) (db);

// export connection and library
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
