import api from "./index";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string; // Include category
}

export type GroupedMenuItems = Record<string, MenuItem[]>; // Define grouped menu items type

export async function fetchMenuGroupedByCategory(): Promise<GroupedMenuItems> {
  const response = await api.get<MenuItem[]>("/menu");
  const items = response.data;

  // Group items by category
  return items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as GroupedMenuItems);
}
