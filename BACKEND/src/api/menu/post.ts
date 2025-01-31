import { RequestHandler } from "express";
import MenuItem from "../../models/menu";

export const createMenuItem: RequestHandler = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category } = req.body;

    if (!category) {
      res.status(400).json({ error: "Category is required." });
      return;
    }

    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      imageUrl,
      category,
    });

    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
