module.exports = function(sequelize, DataTypes) {
  var Director = sequelize.define('director', {
    name: {
      type: DataTypes.STRING,
      field: 'name'
    }
  }, {timestamps: false});

  return Director;
};
