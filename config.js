//todo - get the dev env to run locally
module.exports = {
  production :{
    db: {
      username: process.env.movienight_azuredbuser,
      password: process.env.movienight_azuredbpass,
      database: 'production',
      options: {
        host: 'movienight.database.windows.net',
        dialect: 'mssql',
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        },
        logging: false,
        dialectOptions: {encrypt: true}
      }
    }
  },
  development: {
    db: {
      username: process.env.movienight_azuredbuser,
      password: process.env.movienight_azuredbpass,
      database: 'development',
      options: {
        host: 'movienight.database.windows.net',
        dialect: 'mssql',
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        },
        logging: console.log,
        dialectOptions: {encrypt: true}
      }
    }
  },
  test: {
    db: {
      username: process.env.movienight_azuredbuser,
      password: process.env.movienight_azuredbpass,
      database: 'test',
      options: {
        host: 'movienight.database.windows.net',
        dialect: 'mssql',
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        },
        logging: false,
        dialectOptions: {encrypt: true}
      }
    }
  }
};
