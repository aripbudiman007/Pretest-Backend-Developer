if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

module.exports = {
  "development": {
    "username": process.env.DATABASE_USER_DEV,
    "password": process.env.DATABASE_PASS_DEV,
    "database": process.env.DATABASE_NAME_DEV,
    "host": process.env.DATABASE_HOST_DEV,
    "dialect": process.env.DATABASE_DIALECT_DEV
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
