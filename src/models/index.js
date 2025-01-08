const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve("./src/database.sqlite"), // SQLite database file
  logging: console.log, // Log SQL queries (optional)
});

// Load all models
const models = {};
const modelsDirectory = path.resolve("./src/models"); // Adjust this based on your file structure

fs.readdirSync(modelsDirectory)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  .forEach((file) => {
    const modelPath = path.join(modelsDirectory, file);
    const test = "C:/Users/Erwing/Desktop/Repos/geo-cow/src/models/";
    console.log("Trying to load model from:", modelPath);

    const model = require("../models/" + `${file}`)(sequelize); // Dynamically load model
    models[model.name] = model;
  });

//models.User.hasMany(models.Post, { foreignKey: "userId" });
//models.Post.belongsTo(models.User, { foreignKey: "userId" });

module.exports = { sequelize, models };
