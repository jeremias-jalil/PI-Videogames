const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
  // defino el modelo
  const Videogame = sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID, // valor alfanumerico
      defaultValue: DataTypes.UUIDV4, //valor randome c2c50ab2-9e49-4887-ae7b-b1259ca186cd
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dateRelease: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.FLOAT
    },
    image: {
      type: DataTypes.STRING //validar que sea url
    }
  });


};

