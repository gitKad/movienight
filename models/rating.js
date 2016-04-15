var mongoose = require('../factories/db');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ratingSchema = new Schema({
  user:{
    _id:Object
  },
  movie:{
    _id:Object,
    title:String
  },
  rating:Number
});

module.exports = mongoose.model('Rating', ratingSchema);
