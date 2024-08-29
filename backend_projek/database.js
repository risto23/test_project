const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tes_projek', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
