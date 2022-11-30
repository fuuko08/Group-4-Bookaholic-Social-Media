const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: '%',
        dialect: 'mysql',
        port: 3306,
        database:'bookclub_db',
        username:'root',
        password:'new-strong-password',
        logging:true
    });

module.exports = sequelize;