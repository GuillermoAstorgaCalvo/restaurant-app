import { Request, Response } from "express";
import Menu from "../../models/menu";

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const menuItem = await Menu.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found." });
    }

    await menuItem.destroy();
    res.status(200).json({ message: "Menu item deleted successfully." });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Failed to delete menu item." });
  }
};
