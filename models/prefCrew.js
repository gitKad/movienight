var mongoose = require('../factories/db');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.models = {};
mongoose.modelSchemas = {};

var crewPrefSchema = new Schema({
  user:{
    _id:Object,
    name:String
  },
  crew:{
    _id:Object,
    name:String
  },
  count:Number,
  avg:Number,
  std:Number,
  weight:Number
});

module.exports = mongoose.model('crewPref', crewPrefSchema);
