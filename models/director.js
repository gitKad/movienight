var mongoose = require('../factories/db');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.models = {};
mongoose.modelSchemas = {};

var directorSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Director', directorSchema);
