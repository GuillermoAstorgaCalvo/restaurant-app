import sequelize from "../lib/sequelize";

(async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
  } finally {
    process.exit();
  }
})();
