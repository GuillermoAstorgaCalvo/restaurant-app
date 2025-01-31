import { RequestHandler } from "express";
import MenuItem from "../../models/menu";

export const deleteMenuItem: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !Number.isInteger(Number(id))) {
      return res.status(400).json({ message: "Invalid menu item ID." });
    }

    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found." });
    }

    await menuItem.destroy();
    res.status(200).json({
      message: "Menu item deleted successfully.",
      deletedItemId: id,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete menu item." });
  }
};
