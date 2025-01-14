"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const db = {};

let sequelize;

// Read database connection details from environment variables
const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: process.env.DB_DIALECT || "postgres",
};

if (process.env.DATABASE_URL) {
  // If DATABASE_URL is provided (e.g., for production on platforms like Heroku), use it
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: config.dialect,
  });
} else {
  // Use the environment variables for development/production
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
  });
}
const modelsDirectory = path.resolve("./src/../models"); // Adjust this based on your file structure
fs.readdirSync(modelsDirectory)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1 &&
      file !== "index.js"
    );
  })
  .forEach((file) => {
    const model = require("./" + `${file}`)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    console.log("success model ", model);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
