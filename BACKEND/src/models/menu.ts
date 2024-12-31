import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

// Define the attributes for the MenuItem model
export interface MenuItemAttributes {
  id?: number; // Optional because Sequelize auto-generates it
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

// Define the MenuItem model class
class MenuItem extends Model<MenuItemAttributes> implements MenuItemAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public imageUrl!: string;
  public category!: string;
}

// Initialize the MenuItem model
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
    sequelize, // Pass the Sequelize instance
    tableName: "menus", // Specify the table name
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Export only the class, not the module
export default MenuItem;
