import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

export interface MenuItemAttributes {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export class MenuItem extends Model<MenuItemAttributes> {}

MenuItem.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "menus",
    timestamps: true,
  },
);

export default MenuItem;
