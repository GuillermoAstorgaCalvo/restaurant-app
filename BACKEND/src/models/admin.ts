import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/sequelize";

export type AdminRole = "admin" | "moderator";

export interface AdminAttributes {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  createdAt?: Date;
  updatedAt?: Date;
}

type AdminCreationAttributes = Optional<
  AdminAttributes,
  "id" | "createdAt" | "updatedAt"
>;

class Admin extends Model<AdminAttributes, AdminCreationAttributes> {}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "moderator"),
      allowNull: false,
      defaultValue: "admin",
    },
  },
  {
    sequelize,
    tableName: "admins",
    timestamps: true,
    underscored: true,
  }
);

export default Admin;
