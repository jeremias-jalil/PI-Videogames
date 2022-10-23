const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "short_screenshot",
    {
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
