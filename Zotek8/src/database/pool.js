const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const env = process.env.NODE_ENV || 'development';
const config = require('../configs/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host || 'localhost',
    dialect: config.dialect || 'mysql',
    pool: {
        max: 10,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = sequelize;