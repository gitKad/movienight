var flixsterLurker = require('./flixsterLurker.js'),
    expect = require('chai').expect;



function main() {
  listWTS(789760392,function(){

  });
}

function listWTS(userid, callback) {

  // 789760392 Alexis
  flixsterLurker.getFlixsterUsersScores(userid, function(jsonResult) {
    // Define to JSON type
     var jsonContent = JSON.parse(jsonResult);

    // Get Value from JSON
    for (var i = 0; i < jsonContent.length; i++) {
      console.log("movie_id:", jsonContent[i].movie.id);
      console.log("movie_title:", jsonContent[i].movie.title);
      console.log("score:", jsonContent[i].score);
      console.log("movie_rottenTomatoScore:", jsonContent[i].movie.tomatometer);
      console.log("movie_flixsterScore:", jsonContent[i].movie.audienceScore,'\n');
    }
     callback();
  });
}

describe('flixster Lurker',function() {

  before(function(){
    fLurker = new flixsterLurker();
  });

  it('can retrieve latest movie rating from users', function() {
    expect(fLurker.getFlixsterUsersWantToSee(userid,1)).to.equal('+');
    expect(fLurker.getFlixsterUsersScores(userid,1)).to.not.equal('+');
  });

});

describe('movienight DAL',function(){

  before(function(){
    
  });

  it('can store movies retrieved by flixster lurker',function() {

  });

});
