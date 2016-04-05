var mongoose = require('../factories/db');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var movieSchema = new Schema({
  title: String,
  release_year: Number,
  score: {
    rottenTomato:{
      id: Number,
      tomatometer: Number,
      avg: Number
    },
    flixster:{
      id: Number,
      audienceScore: Number,
      avg: Number
    },
    imdb:{
      id: String,
      score: Number
    },
    TMDb:{
      id: Number,
      score: Number
    }
  }
});

module.exports = mongoose.model('Movie', movieSchema);
