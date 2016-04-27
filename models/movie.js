module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define('movie', {
    title: {
      type: DataTypes.STRING,
      field: 'title'
    },
    release_year: {
      type: DataTypes.INTEGER,
      field: 'release_year'
    },
    rottenTomato_tomatometer: {
      type: DataTypes.INTEGER,
      field: 'rottenTomato_tomatometer'
    },
    rottenTomato_avg: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'rottenTomato_avg'
    },
    flixster_id: {
      type: DataTypes.INTEGER,
      field: 'flixster_id'
    },
    flixster_audienceScore: {
      type: DataTypes.INTEGER,
      field: 'flixster_audienceScore'
    },
    flixster_avg: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'flixster_avg'
    },
    imdb_id: {
      type: DataTypes.STRING,
      field: 'imdb_id'
    },
    imdb_score: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'imdb_score'
    },
    TMDb_id: {
      type: DataTypes.INTEGER,
      field: 'TMDb_id'
    },
    TMDb_score: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'TMDb_score'
    }
  }, {timestamps: false});

  return Movie;
};
