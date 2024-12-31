import { Sequelize } from "sequelize";

// Log environment variables for debugging
console.log("Database Configuration:", {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
});

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME ?? "restaurant", // Database name
  process.env.DB_USER ?? "restaurant_admin", // User
  process.env.DB_PASSWORD ?? "A!dminP@ss123", // Password
  {
    host: process.env.DB_HOST ?? "postgres", // Host
    port: Number(process.env.DB_PORT) || 5432, // Port
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;
