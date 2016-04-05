var request = require('supertest');

describe('loading express', function () {

  var server;

  beforeEach(function () {
    server = require('../factories/server')();
  });

  afterEach(function (done) {
    server.close(done);
  });

  it('responds to /api', function testSlash(done) {
    request(server)
      .get('/api')
      .expect(200, done);
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });

});
