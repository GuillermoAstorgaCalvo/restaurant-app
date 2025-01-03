import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

// Define the allowed status values
export type ReservationStatus =
  | "pendiente"
  | "confirmada"
  | "finalizada"
  | "cancelada";

export interface ReservationAttributes {
  id?: number;
  name: string;
  email: string;
  phone: string;
  date: Date;
  guests: number;
  status: ReservationStatus;
}

export class Reservation extends Model<ReservationAttributes> {}

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
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pendiente",
        "confirmada",
        "finalizada",
        "cancelada"
      ),
      allowNull: false,
      defaultValue: "pendiente",
    },
  },
  {
    sequelize,
    tableName: "reservations",
    timestamps: true,
  }
);

export default Reservation;
