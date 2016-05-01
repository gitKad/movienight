module.exports = function(sequelize, DataTypes) {
  var ActorPreferences = sequelize.define('prefactors', {
    count: {type: DataTypes.DECIMAL(10,2)},
    avg: {type: DataTypes.DECIMAL(10,2)},
    std: {type: DataTypes.DECIMAL(10,2)},
    weight: {type: DataTypes.DECIMAL(10,2)}
  }, {timestamps: false});

  return ActorPreferences;
};
