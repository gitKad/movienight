module.exports = function(sequelize, DataTypes) {
  var MovieActors = sequelize.define('movieactors', {
    importance: {
      type: DataTypes.INTEGER
    }
  }, {timestamps: false});
  return MovieActors;
};
