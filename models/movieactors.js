module.exports = function(sequelize, DataTypes) {
  var MovieActors = sequelize.define('movieactors', {}, {timestamps: false});
  return MovieActors;
};
