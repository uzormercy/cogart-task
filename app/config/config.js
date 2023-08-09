const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_TYPE, DB_PORT } =
  process.env;

module.exports ={
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_TYPE,
     port: DB_PORT
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_TYPE,
     port: DB_PORT
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_TYPE,
     port: DB_PORT
  }
}
