"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GeoMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GeoMessage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      temperature: {
        type: DataTypes.FLOAT,
        allowNull: true, // Optional
        defaultValue: null, // Default to NULL if no value is provided
      },
    },
    {
      sequelize,
      modelName: "GeoMessage",
    }
  );
  return GeoMessage;
};
