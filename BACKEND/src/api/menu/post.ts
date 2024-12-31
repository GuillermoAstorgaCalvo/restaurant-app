import { Request, Response } from "express";
import MenuItem from "../../models/menu";

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price, imageUrl, category } = req.body;

    // Ensure category is passed in the request body
    if (!category) {
      return res.status(400).json({ error: "Category is required." });
    }

    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      imageUrl,
      category, // Ensure this is included
    });

    res.status(201).json(menuItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
