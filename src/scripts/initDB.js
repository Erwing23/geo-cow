const { sequelize, models } = require("../models");

const initDB = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true }); // WARNING: force:true will drop tables!
    console.log("Database initialized successfully!");

    // Show all models
    console.log("Loaded models:");
    Object.keys(models).forEach((modelName) => {
      console.log(`- ${modelName}`);
    });

    // Example: Add seed data

    /*
    const post = await models.Post.create({
      title: "First Post",
      content: "Hello World!",
      userId: user.id,
    });
    console.log(`Added User: ${user.username} with Post: ${post.title}`);
*/
    process.exit(0); // Exit successfully
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1); // Exit with failure
  }
};

initDB();
