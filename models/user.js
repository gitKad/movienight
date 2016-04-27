module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    flixster_id: {
      type: DataTypes.INTEGER
    }
  },{timestamps: false});

  return User;
};
