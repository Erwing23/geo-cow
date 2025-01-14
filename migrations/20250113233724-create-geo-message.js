"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("GeoMessages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      node: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pasos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      latitud: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      longitud: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      recievedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("GeoMessages");
  },
};
