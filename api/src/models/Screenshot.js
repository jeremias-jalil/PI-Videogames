const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('short_screenshot', {
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    });
};