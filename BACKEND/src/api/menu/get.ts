import { Request, Response } from "express";
import Menu from "../../models/menu";

export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const menuItems = await Menu.findAll();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Failed to fetch menu items." });
  }
};
