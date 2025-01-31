import sequelize from "../lib/sequelize";
import "../models/menu";
import "../models/reservation";

(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
  } finally {
    await sequelize.close();
    process.exit();
  }
})();
