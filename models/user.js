var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  profile:{
    firstname:String,
    lastname:String,
    date_of_birth:Date
  }
});

module.exports = mongoose.model('User', userSchema);
