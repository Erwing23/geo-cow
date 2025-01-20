"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GeoData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GeoData.init(
    {
      name: DataTypes.TEXT,
      geom: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "GeoData",
    }
  );
  return GeoData;
};
