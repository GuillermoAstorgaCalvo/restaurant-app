import dotenv from "dotenv";
import Admin, { AdminAttributes } from "../models/admin";
import bcrypt from "bcrypt";

dotenv.config();

(async () => {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      throw new Error("Admin password not defined in .env file");
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admins: Omit<AdminAttributes, "id" | "createdAt" | "updatedAt">[] = [
      {
        name: "admin",
        email: "admin@lamaison.com",
        passwordHash: hashedPassword,
        role: "admin",
      },
    ];

    await Admin.bulkCreate(admins);
  } catch (error) {
  } finally {
    process.exit();
  }
})();
