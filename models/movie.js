var DB = require('../db')

var COLLECTION = 'movies'

// Get all movies
exports.all = function(cb) {
  db = DB.getDB()
  db.collection(COLLECTION).find().toArray(cb)
}

// Create new movie and return its id
exports.create = function(title, year, imdbID, flixsterID, TMDbID, imdbScore, rottenTomatometer, rottenTomatoAvg, flixsterAudienceScore, flixsterAvg, TMDbScore, cb) {
  db = DB.getDB()
  db.collection(COLLECTION).insertOne({
    title: title,
    release_year: year,
    score: {
      rottenTomato:{
        id: null,
        tomatometer: rottenTomatometer,
        avg: rottenTomatoAvg
      },
      flixster:{
        id: flixsterID,
        audienceScore: flixsterAudienceScore,
        avg: flixsterAvg
      },
      imdb:{
        id: imdbID,
        score: imdbScore
      },
      TMDb:{
        id: TMDbID,
        score: TMDbScore
      }
    }
  }, function(err, result) {
    if(err){
      cb(err,null);
    }
    cb(null, result.insertedId );
  });
};

// Remove a movie
exports.remove = function(id, cb) {
  db = DB.getDB()
  db.collection(COLLECTION).remove({_id:id}, function(err, result) {
    cb(err)
  })
}

exports.get = function(id, cb) {
   var cursor = db.collection(COLLECTION).find( { "_id": id} );
   cursor.each(function(err, doc) {
      if (doc != null) {
         cb(doc);
      }
   });
};
