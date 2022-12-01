const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({path:__dirname+'../.env'});

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    "bookclub_db",
    "root",
    "Fuubiettuot1!",
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;