module.exports = function(sequelize, DataTypes) {
  var Actor = sequelize.define('actor', {
    name: {
      type: DataTypes.STRING,
      field: 'name'
    }
  }, {timestamps: false});

  return Actor;
};
