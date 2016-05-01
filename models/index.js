var Sequelize = require("sequelize");
var sequelize = require('../factories/db');
var db        = {};

// import models
db['Actor'] = sequelize.import('./actor');
db['Movie'] = sequelize.import('./movie');
db['Director'] = sequelize.import('./director');
db['User'] = sequelize.import('./user');
db['MovieDirectors'] = sequelize.import('./moviedirectors');
db['MovieActors'] = sequelize.import('./movieactors');
db['MovieRatings'] = sequelize.import('./movieratings');
db['ActorPreferences'] = sequelize.import('./prefactors');

// describe relationships
(function(m) {
  m.Movie.belongsToMany(m.Director, {through: m.MovieDirectors});
  m.Director.belongsToMany(m.Movie, {through: m.MovieDirectors});
  m.Movie.belongsToMany(m.User, {through: m.MovieRatings});
  m.User.belongsToMany(m.Movie, {through: m.MovieRatings});
  m.Movie.belongsToMany(m.Actor, {through: m.MovieActors});
  m.Actor.belongsToMany(m.Movie, {through: m.MovieActors});
  m.User.belongsToMany(m.Actor, {through: m.ActorPreferences});
  m.Actor.belongsToMany(m.User, {through: m.ActorPreferences});
}) (db);

// export connection and library
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
