import { RequestHandler } from "express";
import MenuItem from "../../models/menu";

export const getMenuItems: RequestHandler = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Failed to fetch menu items." });
  }
};
