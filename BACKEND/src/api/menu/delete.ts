import { RequestHandler } from "express";
import MenuItem from "../../models/menu";

export const deleteMenuItem: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      res.status(404).json({ error: "Menu item not found." });
      return;
    }

    await menuItem.destroy();
    res.status(200).json({ message: "Menu item deleted successfully." });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Failed to delete menu item." });
  }
};
