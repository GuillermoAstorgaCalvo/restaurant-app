import sequelize from "../lib/sequelize";
import "../models/menu"; // Import to register the model
import "../models/reservation"; // Import to register the model

(async () => {
  try {
    // Sync all models
    await sequelize.sync({ force: true }); // `force: true` drops and recreates tables
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  } finally {
    await sequelize.close();
    process.exit();
  }
})();
