var mongoose = require('../factories/db');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.models = {};
mongoose.modelSchemas = {};

var ratingSchema = new Schema({
  user:{
    _id:Object,
    name: String
  },
  movie:{
    _id:Object,
    title:String,
    directors: [{
      _id: Object,
      name: String
    }],
    genres: [{
      _id: Object,
      name: String
    }],
    cast: [{
      _id: Object,
      name: String
    }],
  },
  rating:Number
});

module.exports = mongoose.model('Rating', ratingSchema);
