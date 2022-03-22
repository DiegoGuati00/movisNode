const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const ActorsInMovies = sequelize.define('actorsInMovies', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    actorid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mivieid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = { ActorsInMovies };