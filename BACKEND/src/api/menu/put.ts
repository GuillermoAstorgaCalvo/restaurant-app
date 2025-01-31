import { RequestHandler } from "express";
import MenuItem from "../../models/menu";

export const updateMenuItem: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl, category } = req.body;

    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      res.status(404).json({ error: "Menu item not found." });
      return;
    }

    await menuItem.update({ name, description, price, imageUrl, category });
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update menu item." });
  }
};
