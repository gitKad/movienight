var mongoose = require('../factories/db');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.models = {};
mongoose.modelSchemas = {};

var userSchema = new Schema({
  profile:{
    firstName:String,
    lastName:String
  },
  accounts:{
    flixster:Number
  }
});

module.exports = mongoose.model('User', userSchema);
