module.exports = function(sequelize, DataTypes) {
  var MovieDirectors = sequelize.define('moviedirectors', {}, {timestamps: false});
  return MovieDirectors;
};
