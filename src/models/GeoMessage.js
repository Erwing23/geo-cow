const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("GeoMessage", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      initialValue: 0, // Start auto-increment from 0
    },
    node: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pasos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    latitud: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitud: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    recievedAt: {
      type: DataTypes.DATE, // Default format for storing the date
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE, // Default format for storing the date
      allowNull: false,
      defaultValue: Sequelize.NOW, // Default to current time
    },
  });
};
