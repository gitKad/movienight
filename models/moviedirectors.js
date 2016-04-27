module.exports = function(sequelize, DataTypes) {
  var MovieDirectors = sequelize.define('MovieDirectors', {}, {timestamps: false});
  return MovieDirectors;
};
