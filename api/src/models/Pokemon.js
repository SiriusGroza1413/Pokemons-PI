const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      AllowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    health: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png",
      allowNull: true
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
