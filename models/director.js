var mongoose = require('../factories/db');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var directorSchema = new Schema({
  firstname: String,
  lastname: String
});

module.exports = mongoose.model('Director', directorSchema);
