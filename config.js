//todo - get the dev env to run locally
module.exports = {
  production :{
    db: {
      userName: process.env.movienight_azuredbuser,
      password: process.env.movienight_azuredbpass,
      server: 'movienight.database.windows.net',
      options: {encrypt: true, database: 'production'}
    }
  },
  development: {
    db: {
      userName: process.env.movienight_azuredbuser,
      password: process.env.movienight_azuredbpass,
      server: 'movienight.database.windows.net',
      options: {encrypt: true, database: 'development'}
    }
  },
  test: {
    db: {
      userName: process.env.movienight_azuredbuser,
      password: process.env.movienight_azuredbpass,
      server: 'movienight.database.windows.net',
      options: {encrypt: true, database: 'test'}
    }
  }
};
