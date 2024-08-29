const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Contact = sequelize.define('contact', {
   
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telepon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Contact;
