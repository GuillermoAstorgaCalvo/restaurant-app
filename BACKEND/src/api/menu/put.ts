import { Request, Response } from "express";
import Menu from "../../models/menu";

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl } = req.body;

    const menuItem = await Menu.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found." });
    }

    await menuItem.update({ name, description, price, imageUrl });
    res.status(200).json(menuItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: "Failed to update menu item." });
  }
};
