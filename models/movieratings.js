module.exports = function(sequelize, DataTypes) {
  var MovieRatings = sequelize.define('movieratings', {
    rating: {
      type: DataTypes.INTEGER
    }
  }, {timestamps: false});

  return MovieRatings;
};
