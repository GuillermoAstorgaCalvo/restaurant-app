import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

export type ReservationStatus =
  | "pendiente"
  | "confirmada"
  | "finalizada"
  | "cancelada";

interface ReservationAttributes {
  id?: number;
  name: string;
  email: string;
  phone: string;
  date: Date;
  guests: number;
  status: ReservationStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Reservation
  extends Model<ReservationAttributes>
  implements ReservationAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public date!: Date;
  public guests!: number;
  public status!: ReservationStatus;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Reservation.init(
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
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        len: [9, 15],
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: new Date().toISOString(),
      },
    },

    guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    status: {
      type: DataTypes.ENUM(
        "pendiente",
        "confirmada",
        "finalizada",
        "cancelada",
      ),
      allowNull: false,
      defaultValue: "pendiente",
    },
  },
  {
    sequelize,
    tableName: "reservations",
    timestamps: true,
    underscored: true,
  },
);

export default Reservation;
