import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

class Reservation extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare phone: string;
  declare date: Date;
  declare time: string;
  declare guests: number;
  declare notes: string | null;
}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Reservation",
    tableName: "reservations", // Table name in the database
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

export default Reservation;
